import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';

import { ConsultOSFormComponent } from '../consult-os-form/consult-os-form.component';
import { ChecklistCommentComponent } from './checklist-comment/checklist-comment.component';
import { CommentViewComponent } from './comment-view/comment-view.component';

import { CheckListAnswerService } from 'src/app/shared/service/checklist-answer.service';
import { ChecklistService } from 'src/app/shared/service/checklist.service';
import { ClassifierService } from 'src/app/shared/service/classifier.service';

import { CheckListAnswerModel } from 'src/app/shared/model/checklist-answer.model';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistQuestion } from 'src/app/shared/model/checklistQuestion.model';
import { Classifier } from 'src/app/shared/model/classifier.model';



@Component({
  selector: 'app-fill-checklist-form',
  templateUrl: './fill-checklist-form.component.html',
  styleUrls: ['./fill-checklist-form.component.css'],
  providers: [DialogService],
})
export class FillChecklistFormComponent implements OnInit {
 loading = false;
 taskID: number;
 selectedTask: number

  checklist: Checklist = new Checklist();
  radioOptions: Classifier[];

  images: Blob;
  fileName: string;
  answer: CheckListAnswerModel;
  ref: DynamicDialogRef;


  constructor(
    public config: DynamicDialogConfig,
    private checklistService: ChecklistService,
    private classifierService: ClassifierService,
    private cklAnswerService: CheckListAnswerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private consultOS: ConsultOSFormComponent
  ) { }

  ngOnInit(): void {
    this.selectedTask = this.config.data.data;
    this.loadCombos();
    this.consultOS.pauseTimer();
  }

  loadCombos() {
    this.classifierService.searchByType('CHECKLIST_ANSWER').subscribe(
      (data) => {
      this.radioOptions = data.sort((first, second) => (first > second) ? 1 : -1);
    })

    this.checklistService.getAnswerByChecklist(this.selectedTask).pipe(first()).subscribe(
      (data: any) => {
        this.checklist = data.checklist;
        this.checklist.groups.forEach(group => {
          group.answered = 0;
          group['collapsed'] = true;
          group.questions.forEach(question => {
            question.answer = data.answers.find(answer => answer.question.id == question.id);
            if (question.answer != undefined) {
              group.answered++
            } else {
              question.answer = new CheckListAnswerModel();
            }
          });
        });
      });
  }

  saveOnChange(answer, question){   
    if (answer.question == undefined || answer.question == null) {
      answer.question = question;
      answer.task = this.selectedTask;
    }
    if (answer.answer.id == 42 || answer.answer.id == 44) {
        this.saveChecklist(answer);
    } 
    else if (answer.answer.id == 43) {
      this.openCommentModal(answer);
    }   
  }

  // SaveAndFinish() {
  //   let disabled = true;
  //   if (this.checklist != undefined && this.checklist.groups != undefined) {
  //     this.checklist.groups.forEach(groups => {
  //       groups.answered < groups.questions.length ? disabled = true : disabled = false;
  //     });
  //   }
  //   return disabled;
  // }
   
  saveChecklist(answer) {
    this.cklAnswerService.saveOrUpdate(answer, this.images, this.fileName).subscribe(
      (data) => {
        if (data) {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Salvo', detail: 'Resposta gravada com sucesso' });
        }
        this.resetRegisterChecklist();
        
    }, 
      (error) => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      });
  };

  openCommentModal(model: CheckListAnswerModel) {
  this.ref = this.dialogService.open(ChecklistCommentComponent, {
    data: { model },
    header: model.question.question,
    width: "50rem",
    contentStyle: { overflow: "auto" },
    baseZIndex: 10000,
    
  });

  this.ref.onClose.subscribe((i) => {
    if(i != undefined) {
        this.images = i.blobImages;
        this.fileName = i.fileName;
        this.saveChecklist(i);
    }
    else{
      this.loadCombos();
    }
  });  
  }

  openModalCommentView(model: CheckListAnswerModel) {
    this.ref = this.dialogService.open(CommentViewComponent, {
      data: { model },
      header: model.question.question,
      width: "70rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,    
    }); 

    this.ref.onClose.subscribe((i) => {
      if(i != undefined) 
        this.saveChecklist(model);
      else
        this.loadCombos();
  
    }) 
  }

  onUpload(event, checklist: ChecklistQuestion) { 
  const fileName = event.files[0].name;
  this.images = event.files[0];
  setTimeout(() => {
    this.saveChecklist(checklist.answer);
   
  },500); 

}

 resetRegisterChecklist() {
  this.loadCombos();
  this.images = undefined;
  this.fileName = undefined;
}

  closeModal() {
  this.confirmationService.close()
 }
}