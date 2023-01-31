import { Component, OnInit } from "@angular/core";
import { AppComponent } from '../../../app.component';
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { first } from "rxjs/operators";

import { ChooseMovimentModalFormComponent } from "../../os-detail-form/choose-moviment-modal-form/choose-moviment-modal-form.component";
import { ConsultOSFormComponent } from "../consult-os-form.component";
import { FillChecklistFormComponent } from "../../fill-checklist-form/fill-checklist-form.component";
import { GeneratePdfComponent } from "src/app/shared/component/generate-pdf/generate-pdf.component";

import { TaskService } from "src/app/shared/service/task.service";
import { StageService } from "../../stage-form/step-form.service";
import { ChecklistService } from "src/app/shared/service/checklist.service";
import { OSDetailFormService } from "../../os-detail-form/os-detail-form.service";

import { Checklist } from "src/app/shared/model/checklist.model";
import { TaskWithTimeModel } from "src/app/shared/model/task-with-time.model";
import { CheckListAnswerModel } from "src/app/shared/model/checklist-answer.model";
import { Stage } from "src/app/shared/model/stage.model";
import { TaskUserModel } from "src/app/shared/model/task-user.model";
import { TaskModel } from "src/app/shared/model/task.model";
@Component({
  selector: "app-consult-os-form-modal",
  templateUrl: "./consult-os-form-modal.component.html",
  styleUrls: ["./consult-os-form-modal.component.scss"],
  providers: [DialogService]
})
export class ConsultOsFormModalComponent implements OnInit {
  header: string;
  hasChecklist = false;
  hasLogoutOnAction: boolean;

  checklist: Checklist

  task: TaskModel = new TaskModel();
  taskByUser: TaskModel;
  listUsers: TaskUserModel[] = [];

  selectedTask: TaskWithTimeModel[];
  totalTaskTime: string = "";

  stage: Stage;
  movementsTmp: any[];

  

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private taskService: TaskService,
    private messageService: MessageService,
    private stageService: StageService,
    private dialogService: DialogService,
    private osService: OSDetailFormService,
    private checklistService: ChecklistService,
    private app: AppComponent,
    private consultOS: ConsultOSFormComponent
    ){}

  ngOnInit(): void {
    this.task = this.config.data.task;
    this.hasLogoutOnAction = this.config.data.action
    
    this.loadCombos();
  }
  
  loadCombos() {
    this.taskService.getByUser(this.task.id).pipe(first()).subscribe(
      (data) => {
        if (data) {
          this.taskByUser = data;
        }
      },
      (error) => {
        if (error.status != null) {
          this.messageService.add({
            key: "tst", severity: "error", summary: "Erro", detail: error,
          });
        }
      }
      );
      
      this.taskService.listUsers(this.task.id).pipe(first()).subscribe(
        (data) => {
          this.listUsers = data;
        },
        (error) => {
          if (error.status != null) {
            this.messageService.add({
              key: "tst", severity: "error", summary: "Erro", detail: error,
            });
          }
        }
        );
        
        this.stageService.getById(this.task.stage.id).pipe(first()).subscribe(
          (data) => {
            this.stage = data;
            if (this.stage.checklist != null && this.stage.checklist != undefined) 
              this.loadAnswered();
      },
      (error) => {
        if (error.status != null) {
          this.messageService.add({ key: "tst", severity: "error", summary: "Erro", detail: error, });
        }
      }
    );

    this.osService.getById(this.task.serviceOrder.id).pipe(first()).subscribe((data) => {
      this.selectedTask = data.tasks.filter((t) => t.id == this.task.id);
      this.totalTaskTime = this.selectedTask[0].totalTime;
    });
  }

  loadAnswered(){
    this.checklistService.getAnswerByChecklist(this.task.id).pipe(first()).subscribe(
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

  movimentTasks(moviment: string) {
    this.consultOS.pauseTimer();
    if (moviment == "start") {
      this.taskService.startTask(this.task.id).pipe(first()).subscribe(
          (data) => {
            if (data) {
              this.closeModal('movement');
              this.messageService.add({ key: "tst", severity: "success", summary: "Sucesso!", detail: "Tarefa iniciada com sucesso!", });
              this.logout();
            }
          },
          (error) => {         
            this.messageService.add({ key: "tst", severity: "warn", summary: "Atenção!", detail: error,
            });
            this.consultOS.starTimer();
          }
        );
    }
    if (moviment == "finish") {
      this.movementsTmp = this.stage.moviments.filter((m) => m.type.value === "MOVEMENT");
      if (this.movementsTmp.length == 1) {
        this.taskService.finishTask(this.task.id, this.movementsTmp[0].id).pipe(first()).subscribe(
            (data) => {
              if (data) {
                this.closeModal('finishMovement');      
                this.messageService.add({key: "tst", severity: "success", summary: "Sucesso!", detail: "Tarefa finalizada com sucesso!", });
                this.generateProof(data);
              }
            },
            (error) => {
              this.messageService.add({ key: "tst", severity: "error", summary: "Erro",detail: error, });
            }
          );
      } else {
        this.closeModal('finishMovement');
        this.ref = this.dialogService.open(ChooseMovimentModalFormComponent, {
          data: { movements: this.movementsTmp, task: this.taskByUser , action: this.hasLogoutOnAction},
          header: "Escolha a próxima etapa",
          width: "40rem",
          contentStyle: { overflow: "auto" },
          baseZIndex: 10000,
        });

        this.ref.onClose.subscribe((i) => {
          if (i == undefined && this.hasLogoutOnAction) {
            this.app.logout();
          }
        });
      }
    }
  }

  generateProof(task: TaskUserModel){
      this.ref = this.dialogService.open(GeneratePdfComponent, {
          data: {taskByUser: task, action: this.hasLogoutOnAction},
          width: '100%',
          style: {visibility: 'hidden'}
        });
  }

  openChecklistModal(data, header: string) {
    this.ref = this.dialogService.open(FillChecklistFormComponent, {  
      data: { data },
      header: header,
      width: '95%',
      height: '80%'
   });
   this.ref.onClose.subscribe((i) => {
    if (this.hasLogoutOnAction) 
      this.consultOS?.starTimer();

  });
  }

  closeModal(movement: string) {
    if (movement == 'movement' && this.hasLogoutOnAction) {
      this.ref.close();
      this.app.logout();
      return;
    }
    this.ref.close('movement');
  }

  logout(){
    if (this.hasLogoutOnAction) {
      this.closeModal('movement');
      this.app.logout();
      return;
    }
  }
}
