import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as _ from 'lodash';

import { AppComponent } from 'src/app/app.component';
import { ConsultOsFormModalComponent } from './consult-os-form-modal/consult-os-form-modal.component';

import { CheckpointService } from 'src/app/shared/service/checkpoint.service';
import { ConsultOsService } from './consult-os-form.service';

import { TaskModel } from 'src/app/shared/model/task.model';
import { TaskUserModel } from 'src/app/shared/model/taskUser.model';
import { Checkpoint } from 'src/app/shared/model/checkpoint.model';
import { ParameterService } from 'src/app/shared/service/parameter.service';

@Component({
  selector: "wbp-consult-os-form",
  templateUrl: "./consult-os-form.component.html",
  styleUrls: ["./consult-os-form.component.css"],
  providers: [DialogService],
})
export class ConsultOSFormComponent implements OnInit {
  loading = false;
  isEdit = false;

  hasLogoutOnAction: boolean;
  minLenght = 6;

  timeLeft: number;
  timeToLogout: number;
  interval;


  consultList: TaskModel[];

  cols: any[];
  consultRegister: TaskModel = new TaskModel();
  taskInProgress: TaskUserModel[];

  consultSearch = new FormGroup({
    osOrChassi: new FormControl("", [
      Validators.required,
      Validators.minLength(this.minLenght),
    ]),
  });

  ref: DynamicDialogRef;

  @ViewChild("dt", { static: false }) dt: any;


  checkpointList: Checkpoint[];

  constructor(
    private consultservice: ConsultOsService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private checkpointService: CheckpointService,
    private app: AppComponent,
    private parameterService: ParameterService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "number", header: "Nº da OS" },
      { field: "brand", header: "Marca" },
      { field: "model", header: "Modelo" },
      { field: "plate", header: "Placa" },
      { field: "chassi", header: "Chassi" },
    ];

    this.consultLoadMov();
    setTimeout(() =>{this.loadParams()}, 500);
    
  }

  ngOnDestroy(){
    this.pauseTimer();

   if(this.ref != undefined)
     this.ref.destroy();
  }  


  
  loadParams(){  
    this.route.queryParams.subscribe(params => { 
      if(params['osOrChassi'] != null && params['osOrChassi'] != undefined){
        this.consultSearch.controls['osOrChassi'].setValue(params['osOrChassi']);        
        this.search(params['osOrChassi']);
      }
    });
  }

  loadCombos(){
    this.checkpointService.getByCurrentUser().pipe(first()).subscribe(
      (data) => {
        this.checkpointList = data ? data : [];
        this.hasLogoutOnAction = this.checkpointList.filter(checkpoint => checkpoint.name === 'LOGOUT_ON_ACTION').length > 0;
    },
      (error)=>{
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.parameterService.searchByName('LOGOUT_ON_ACTION_TIME_IN_SECONDS').pipe(first()).subscribe(
      (data)=>{
        this.timeToLogout = +data[0].value;
      },
      (error)=>{
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      }

    );
  }
  
  consultLoadMov() {
    this.consultservice.listInProgress().pipe(first()).subscribe(
        (data) => {
          this.taskInProgress = data;
          this.loadCombos();
        },
        (error) => {
          this.messageService.add({key: "tst", severity: "warn", summary: "Erro", detail: error,
          });
        }
      );
  }

  search(params: string) {    
    if (params == null) {      
          if (this.consultSearch.get("osOrChassi").value != '') {      
            this.consultservice.getByOsChassi(this.consultSearch.get("osOrChassi").value).subscribe(
                (data) => {
                  this.consultList = data;
                },
                (error) => {               
                  if (error === "OS não disponivel para esta Etapa!" || error === "OS Inválida!")
                    this.messageService.add({key: "tst", severity: "warn", summary: "Atenção!", detail: error, });
                  else
                    this.messageService.add({key: "tst", severity: "error", summary: "Erro!", detail: error, });
                  
                  this.resetSearchForm();
                }
              );
          }
    } else {
      if (this.consultSearch.get("osOrChassi").value != '') { 
        
        const osGetThenByParam = this.taskInProgress.filter(
          (os) =>
            os.task.serviceOrder.number == params ||
            os.task.serviceOrder.chassi.slice(-6) == params || 
            os.task.serviceOrder.chassi == params
        );
        
        if (this.hasLogoutOnAction)
          this.starTimer();

        if (this.taskInProgress != null && osGetThenByParam.length > 0) {
            this.openModal(this.taskInProgress[0].task, this.taskInProgress[0].task.stage.name);
            return;
        } 
        else{
          this.consultservice.getByOsChassi(this.consultSearch.get("osOrChassi").value).subscribe(
              (data) => {
                this.consultList = data;
                this.openModal(this.consultList[0], this.consultList[0].stage.name);
              },
              (error) => {
                if (error === "OS não disponivel para esta Etapa!" || error === "OS Inválida!")
                  this.messageService.add({key: "tst", severity: "warn", summary: "Atenção!", detail: error, });
                else
                  this.messageService.add({key: "tst", severity: "error", summary: "Erro!", detail: error, });
                
                //DESLOGA O USUARIO TÉCNICO APÓS ALGUM ERRO DURANTE A PESQUISA POR OS
                if (this.hasLogoutOnAction) 
                    this.app.logout();
                else
                  this.resetSearchForm();
              });
        }
      }
    }
  }

  openModal(task: TaskModel, header: string) {
    this.ref = this.dialogService.open(ConsultOsFormModalComponent, {
      data: { task, action: this.hasLogoutOnAction},
      modal: true,
      header: header,
      width: "60rem",
      contentStyle: { overflow: "hidden" },
      baseZIndex: 10000,
    });

      this.ref.onClose.subscribe((i) => {
        if (i == undefined && this.hasLogoutOnAction)
          this.app.logout();
        else{
          this.resetSearchForm();
        }
      });
  }

  starTimer(){
    this.timeLeft = this.timeToLogout;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) 
        this.timeLeft--;
      else {
        this.pauseTimer();
        this.app.logout();
      }
    },1000);  
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  
  resetSearchForm() {
    this.consultSearch.reset({ osOrChassi: "" });
    this.consultList = [];
    this.consultLoadMov();  
  }
}
