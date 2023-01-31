import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { StageService } from './step-form.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';


import { ClassifierService } from 'src/app/shared/service/classifier.service';
import { Classifier } from 'src/app/shared/model/classifier.model';

import { StageMovement } from 'src/app/shared/model/stage-movement.model';
import { Stage } from 'src/app/shared/model/stage.model';
import { Subject } from 'rxjs';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistService } from 'src/app/shared/service/checklist.service';
import { ServiceOrderModel } from 'src/app/shared/model/serviceOrderModel';
import { AppointmentService } from 'src/app/shared/service/appointment.service';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';
import { SearchAppointmentModel } from 'src/app/shared/model/search-appointments.model';

@Component({
  selector: 'wbp-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  loading = false;
  isEdit = false;

  stageList: Stage[];
  usersCommitteeList: StageMovement[];
  buttonTypesList: Classifier[];
  items: MenuItem[];
  cols: any[];

  clearEvent: EventEmitter<any> = new EventEmitter();
  eventsSubject: Subject<void> = new Subject<void>();

  home: MenuItem;
  stageMovementRegister: StageMovement = new StageMovement();
  stageSearch: Stage = new Stage();
  stageRegister: Stage = new Stage();

  checklistlist: Checklist[];

  @ViewChild('stageRegisterForm', { static: false }) stageRegisterForm: NgForm;
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: StageService,
    private checklistService: ChecklistService,
    private classifierService: ClassifierService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Nome' }
    ];
    this.resetSearchForm();
    this.resetRegisterForm();
    this.loadStages();
  }

  loadStages() {
    this.service.getAll().pipe(first()).subscribe(data => {
      this.stageList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  loadCombos() {

    this.classifierService.searchByType('MOVEMENT_TYPE').pipe(first()).subscribe(data => {
      this.buttonTypesList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
    this.checklistService.getAll().pipe(first()).subscribe(data => {
      this.checklistlist = data;
    })
  }

  resetSearchForm() {
    this.loadStages();
    this.stageSearch = new Stage();
  }

  search(event) {
    this.loadStages();
    this.service.search(this.stageSearch).pipe(first()).subscribe(data => {
      this.stageList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  edit(event) {
    this.isEdit = true;
    this.resetRegisterForm();
    let stage = event.data;

    this.service.getById(stage.id).pipe(first()).subscribe(data => {
      this.stageRegister = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

  }

  remove(parameter: Stage) {
    this.confirmationService.confirm({
      message: `Deseja remover ${parameter.name}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.service.delete(parameter.id).pipe(first()).subscribe(data => {
          this.messageService.add({ key: 'tst', severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
          this.resetSearchForm();
          this.resetRegisterForm();
          this.stageRegisterForm.reset();
        }, error => {
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
        });
      }
    });
  }

  save() {

    this.service.save(this.stageRegister).pipe(first()).subscribe(data => {
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Salvo com sucesso', detail: `Registro adicionado com sucesso!` });
      this.resetSearchForm();
      this.resetRegisterForm();
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  resetRegisterForm() {
    this.isEdit = false;
    this.stageRegister = new Stage();
    this.clearEvent.emit(true);
    this.loadCombos();
    if (this.stageRegisterForm != undefined && this.stageRegisterForm != null)
      this.stageRegisterForm.reset();
  }
}
