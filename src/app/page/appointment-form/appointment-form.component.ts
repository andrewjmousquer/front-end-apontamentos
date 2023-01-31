import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { StageService } from '../stage-form/step-form.service';
import { AppointmentService } from 'src/app/shared/service/appointment.service';
import { CheckpointService } from 'src/app/shared/service/checkpoint.service';
import { UserService } from 'src/app/shared/service/user.service';

import { SearchAppointmentModel } from 'src/app/shared/model/search-appointments.model';
import { Stage } from 'src/app/shared/model/stage.model';
import { EditTaskUserTimeModel } from 'src/app/shared/model/edit-task-user-time';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';
import { Checkpoint } from 'src/app/shared/model/checkpoint.model';
import { User } from 'src/app/shared/model/user.model';






@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  loading = false;
  isEdit = false;

  users: User[]

  taskList: AppointmentModel[];
  taskModal: AppointmentModel = new AppointmentModel();
  taskSave: EditTaskUserTimeModel = new EditTaskUserTimeModel();
  
  cols: any[]; 

  clearEvent: EventEmitter<any> = new EventEmitter();
  eventsSubject: Subject<void> = new Subject<void>();

  taskSearch: SearchAppointmentModel = new SearchAppointmentModel();
  taskRegister: AppointmentModel = new AppointmentModel();

  adicionando: boolean = false;
  disabled: boolean = true;

  stageList: Stage[];
  checkpointList: Checkpoint[];
  hasExportPermission: boolean = false;


  ELEMENT_DATA: AppointmentModel [] = [

  ];

  displayedColumns: string[] = ['username', 'numberOs', 'brand', 'model', 'stageName', 'dateStart', 'dateFinish', 'totalTime', 'value']
  dataSource = this.ELEMENT_DATA;

  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  @ViewChild('dt', { static: false }) dt: any;

  constructor(
    private messageService: MessageService,
    private appointmentService: AppointmentService,
    private stageService: StageService,
    private cdref: ChangeDetectorRef,
    private checkpointService: CheckpointService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'userName', header: 'Nome' },
      { field: 'numberOS', header: 'Nº da OS' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
      { field: 'stageName', header: 'Etapa' },
      { field: 'dateStart', header: 'Início' },
      { field: 'dateFinish', header: 'Fim' },
      { field: 'totalTime', header: 'Horas' },
      { field: 'value', header: 'Valor Serviço' },
      { field: 'valueRecived', header: 'Valor Recebido' },
      { field: 'paymentByTeam', header: 'Pagamento por equipe' }
    ];  
    this.resetSearchForm();
    this.resetRegisterForm();
    this.reload();
    this.loadCombos();

  }



  loadCombos(){
    this.stageService.getAll().pipe().subscribe(
      (data) => {
        if(data){
          this.stageList = data; 
        }
    },(error)=>{

    });

    this.checkpointService.getByCurrentUser().pipe(first()).subscribe(
      (data) => {
        this.checkpointList = data ? data : [];
        this.hasExportPermission = this.checkpointList.filter(checkpoint => checkpoint.name === 'EXPORT_APPOINTMENTS').length > 0;
    },
      (error)=>{
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.userService.getAll().pipe(first()).subscribe(
      (data)=>{
        if (data) {
          this.users = data;
        }
      },
      (error)=>{
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      }
    )

  }


  export() {
     this.appointmentService.exportappointments(this.taskSearch).pipe(first()).subscribe((res: any) => {
      let blob: Blob = new Blob([res.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}); // replace the type by whatever type is your response
      const link = document.createElement("a");   
      const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', "apontamentos.xlsx");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

    }
    , error => {
       this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    }
    
    );
  }

  reload() {
    this.appointmentService.searchObject(this.taskSearch).pipe(first()).subscribe(
      (data) => {
        this.taskList = data;     
        this.cdref.detectChanges();
    }, 
      (error) => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  save() {
    this.appointmentService.appointmentEdit(this.taskSave).pipe(first()).subscribe(data => {
      if (data == true) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Salvo', detail: 'O apontamento foi salvo com sucesso' });
        this.cancel();
        this.reload();
      }
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  };

  edit(event) {
    this.isEdit = true;
    this.resetRegisterForm();
    this.resetSearchForm();
  }

  search() { 
     this.appointmentService.searchObject(this.taskSearch).pipe(first()).subscribe(data=> {
      this.taskList = data; 
    }) 
  }

  resetRegisterForm() {
    this.isEdit = false;
    this.taskRegister = new AppointmentModel();
    this.clearEvent.emit(true);
  }

  resetSearchForm() {
    this.taskSearch = new SearchAppointmentModel();
    this.reload();
  }

  newModal(rowData: AppointmentModel) {
    
    this.taskSave.id = rowData.idRegisterTime;
    
    this.taskSave.userName = rowData.userName
    this.taskSave.numberOS = rowData.numberOS;
    this.taskSave.model = rowData.model;
    this.taskSave.brand = rowData.brand;
    this.taskSave.stageName = rowData.stageName
    
    let date = new Date;
    let timelocate = date.toLocaleString("en-US", {timeZone:'America/Sao_Paulo'});
  
     
    this.taskSave.dateStart = new Date  (timelocate);
    
    this.taskSave.dateFinish = new Date (timelocate);

    this.taskSave.totalTime = rowData.totalTime.toString();
    
    this.adicionando = true;

  }

  cancel() {
    this.taskSave = new AppointmentModel();
    this.adicionando = false;
  }

  resetSearch() {
    this.isEdit = false;
    this.taskList = [];
    this.taskSearch = new SearchAppointmentModel();
    this.clearEvent.emit(true);
    this.reload();
    if (this.searchForm != undefined && this.searchForm != null)
      this.searchForm.reset();
  }
}


