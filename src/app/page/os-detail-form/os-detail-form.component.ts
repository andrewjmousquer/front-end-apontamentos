import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OSDetailFormService } from './os-detail-form.service';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SpecialServiceModalFormComponent } from './special-service-modal-form/special-service-modal-form.component';
import { AddPersonModalFormComponent } from './add-people-modal-form/add-person-modal-form.component';
import { StageDetailModalFormComponent } from './stage-detail-modal-form/stage-detail-modal-form.component';
import { ServiceOrderModel } from 'src/app/shared/model/service-order.model';
import { TaskWithTimeModel } from 'src/app/shared/model/task-with-time.model';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { TaskUserModel } from 'src/app/shared/model/task-user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StageService } from '../stage-form/step-form.service';
import { Stage } from 'src/app/shared/model/stage.model';
import { ChooseMovimentModalFormComponent } from './choose-moviment-modal-form/choose-moviment-modal-form.component';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';
import { TaskModel } from 'src/app/shared/model/task.model';
import { ChecklistService } from 'src/app/shared/service/checklist.service';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { CheckListAnswerModel } from 'src/app/shared/model/checklist-answer.model';
import { FillChecklistFormComponent } from '../fill-checklist-form/fill-checklist-form.component';


@Component({
  selector: 'wbp-os-detail-form',
  templateUrl: './os-detail-form.component.html',
  styleUrls: ['./os-detail-form.component.css'],
  providers: [DialogService]
})
export class OSDetailFormComponent implements OnInit {
  loading = false;
  isEdit = false;
  totalStageTimes: string = '';
  selectedTask: TaskWithTimeModel = new TaskWithTimeModel();
  task: TaskModel = new TaskModel();
  checklist: Checklist
  hasChecklist = false

  colsInProgress: any[];
  colsFinished: any[];
  colsInOpened: any[];
  colsStageDetails: any[];
  colsUserList: any[];

  osId: number;
  os: ServiceOrderModel = new ServiceOrderModel();
  inProgressList: TaskWithTimeModel[] = [];
  finishedList: TaskWithTimeModel[] = [];
  inOpenedList: TaskWithTimeModel[] = [];
  stageDetailsList: AppointmentModel[] = [];
  taskUserList: TaskUserModel[];
  stage: Stage = new Stage();
  movementsTmp: any[];
  hasmovementsTmp: any[] = [];

  ref: DynamicDialogRef;

  @ViewChild('stageRegisterForm', { static: false }) stageRegisterForm: NgForm;
  @ViewChild('ta', { static: false }) ta: any;
  @ViewChild('tf', { static: false }) tf: any;
  @ViewChild('tab', { static: false }) tab: any;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private osService: OSDetailFormService,
    private stageService: StageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private checklistService: ChecklistService
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => { this.osId = params['osId']; });
    this.loadCombos();
    
    this.colsInOpened = [
      { field: 'name', header: 'Etapa' },
    ];
    this.colsInProgress = [
      { field: 'status.value', header: 'Status' },
      { field: 'stage.name', header: 'Etapa' },
      { field: 'totalTime', header: 'Tempo Envolvido' }
    ];
    this.colsFinished = [
      { field: 'stage.name', header: 'Etapa' },
      { field: 'stage.special', header: 'Serviço Especial' },
      { field: 'totalTime', header: 'Tempo Envolvido' },
      { field: 'checklistFile', header: 'Checklist' },
    ];
    this.colsStageDetails = [
      { field: 'userName', header: 'Nome' },
      { field: 'dateStart', header: 'Início' },
      { field: 'dateFinish', header: 'Fim' },
      { field: 'totalTime', header: 'Horas' },
    ];
    this.colsUserList = [
      { field: 'userName', header: 'Nome' },
      { field: 'status', header: 'Status' },
    ];
  }

  loadCombos() {
    this.osService.getById(this.osId).pipe(first()).subscribe(res => {

      this.os = res.serviceOrder;
      
      
      this.inProgressList = [];
      this.finishedList = [];
      this.inOpenedList = [];
      
      res.tasks.forEach(task => {
        if (task.status.value == 'AGUARDANDO_INICIO') { this.inOpenedList.push(task) }
        else if (task.status.value == 'EM_ANDAMENTO' || task.status.value == 'PAUSADO') { this.inProgressList.push(task) }
        else if (task.status.value == 'FINALIZADO') { this.finishedList.push(task) }

      })
    })
  }

  loadAnswered(){
    this.checklistService.getAnswerByChecklist(this.selectedTask.id).pipe(first()).subscribe(
      (data: any) => {
        this.checklist = data.checklist;
        this.checklist.groups.forEach(group => {
          group.answered = 0;
          group.questions.forEach(question => {
            question.answer = data.answers.find(answer => answer.question.id == question.id);
            if (question.answer != undefined) {
              group.answered++
            } else {
              question.answer = new CheckListAnswerModel();
            }
            this.hasChecklist = true;
          });
        });
      })
  }

  openModal(data, header: string) {

    if (header == 'Tarefa em Andamento') {
      this.ref = this.dialogService.open(SpecialServiceModalFormComponent, {
        data: { data },
        header: header,
        width: '60%',
        contentStyle: { "overflow": "auto" },
        baseZIndex: 10000
      });
    } else if (header == 'Adicionar Pessoa') {
      this.ref = this.dialogService.open(AddPersonModalFormComponent, {
        data: { data },
        header: header,
        width: '60%',
      });
    } else if (header == 'Editar Hora') {
      this.ref = this.dialogService.open(StageDetailModalFormComponent, {
        data: { data },
        header: header,
      });
    } else if (header == 'Serviço Especial') {
      this.ref = this.dialogService.open(SpecialServiceModalFormComponent, {
        data: { data: data, stage: this.stage, taskId: this.selectedTask.id },
        header: header,
      });
    }
      else if (header == 'Preenchimento de Checklist') {
      this.ref = this.dialogService.open(FillChecklistFormComponent, {
        data: { data },
        header: header,
        width: '80%',
        height: '80%'
     });
    }

    if (this.ref != undefined) {
      this.ref.onClose.subscribe((i) => {
        if (i == 'insert') {
          this.resetAll();
        } else if (i == 'resetLists') {
          this.resetLists();
        }
      });
    }
  }

  resetLists() {
    this.stageDetailsList = [];
    this.totalStageTimes = '';
    this.taskUserList = [];
    this.selectedTask = new TaskWithTimeModel();
    this.loadCombos();
  }

  resetAll() {
    this.stageDetailsList = [];
    this.totalStageTimes = '';
    this.taskUserList = [];
    this.selectedTask = new TaskWithTimeModel();
    this.ta.reset();
    this.tf.reset();
    this.tab.reset();
    this.loadCombos();
  }

  loadStageDetailByTask(task: TaskWithTimeModel) {
    this.totalStageTimes = '';
    this.selectedTask = task;
    
    this.osService.searchDetailsByAppointment(task).pipe(first()).subscribe(res => {
      this.stageDetailsList = res;
      this.stageDetailsList.forEach(e => {
        const any = [this.totalStageTimes, e.totalTime];
        const sum = any.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());
        this.totalStageTimes = [Math.floor(sum.asHours()), sum.minutes(), sum.seconds()].join(':');
      });
    })

    this.osService.listUsers(task.id).pipe(first()).subscribe(res => {
      this.taskUserList = res
    })

    this.stageService.getById(task.stage.id).pipe(first()).subscribe(res => {
      if (res) {
        this.stage = res;
        this.hasmovementsTmp = this.stage.moviments.filter(movement => movement.type.value === "SPECIAL");
        if (this.stage.checklist != null && this.stage.checklist != undefined) {
          this.loadAnswered();
        }
      }
    })

  }

  changeTaskStatus(task: TaskUserModel, action: string) {

    if (action == 'pause') {
      this.toastConfirmation('Pausar', 'pausada', task, null);
    } else if (action == 'resume') {
      this.toastConfirmation('Continuar', 'continuada', task, null);
    } else if (action == 'finish') {
      this.movementsTmp = [];
      this.movementsTmp = this.stage.moviments.filter(movement => movement.type.value === "MOVEMENT");
      if (this.movementsTmp.length == 1) {
        this.toastConfirmation('Finalizar', 'finalizada', task, this.movementsTmp[0].id);
      } else {

        this.ref = this.dialogService.open(ChooseMovimentModalFormComponent, {
          data: { movements: this.movementsTmp, task: task },
          header: 'Escolha a próxima etapa',
          width: '40rem',

        });

        if (this.ref != undefined) {
          this.ref.onClose.subscribe((i) => {
            if (i == true) {
              this.resetAll();
            }
          });
        }
      }
    }
  }

  toastConfirmation(action: string, actionMessage: string, task: TaskUserModel, movimentID: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente ' + action + ' esta tarefa?',
      header: action + ' tarefa:',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (action == 'Pausar') {
          this.osService.pauseTask(task.task.id, task.user).pipe(first()).subscribe(res => {
            if (res) {
              this.messageService.add({ key: 'tst', severity: 'success', summary: 'Confirmado!', detail: 'Tarefa ' + actionMessage + ' com sucesso!' });
              this.resetLists()
            }
          }, err => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro!', detail: err });
          })
        } else if (action == 'Continuar') {
          this.osService.resumeTask(task.task.id, task.user).pipe(first()).subscribe(res => {
            if (res) {
              this.messageService.add({ key: 'tst', severity: 'success', summary: 'Confirmado!', detail: 'Tarefa ' + actionMessage + ' com sucesso!' });
              this.resetLists()
            }
          }, err => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro!', detail: err });
          })
        } else if (action == 'Finalizar') {
          this.osService.finishTask(task.task.id, task.user, movimentID).pipe(first()).subscribe(res => {
            if (res) {
              this.messageService.add({ key: 'tst', severity: 'success', summary: 'Confirmado!', detail: 'Tarefa ' + actionMessage + ' com sucesso!' });
              this.resetLists()
            }
          }, err => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro!', detail: err });
          })
        }
      }
    });
  }

  back() {
    this.router.navigate(['/os-view-form'], {})
  }

  openConsultOS(id: Number) {
    this.router.navigate(['/fill-checklist-form'], { queryParams: { taskID: id } })
   
  }

}
