import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CheckListAnswerModel } from 'src/app/shared/model/checklist-answer.model';


@Component({
  selector: 'app-checklist-comment',
  templateUrl: './checklist-comment.component.html',
  styleUrls: ['./checklist-comment.component.css'],
  providers: [DialogService]
})
export class ChecklistCommentComponent implements OnInit {

  isLoading: boolean;
  model: CheckListAnswerModel = new CheckListAnswerModel();
  header: string;

  images: Blob;
  fileName: string;

  modelComment = new FormGroup({
    comment: new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.model = this.config.data.model;
  }

  sendComment() {
    if (this.model.answer.id == 43 || this.model.id == 0) {
        if ((this.modelComment.get('comment').value != null && this.modelComment.get('comment').value != '')
              && (this.model.blobImages != null && this.model.blobImages !=undefined)) {
              this.saveCloseModal();
        } else {
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Foto é obrigatória em caso de NOK ' });
        }
    } else {
        this.saveCloseModal();
    }
}

onUpload(event) { 
  this.model.fileName = event.files[0].name;
  this.model.blobImages = event.files[0];
}

saveCloseModal() {
  this.model.comment = this.modelComment.get('comment').value;
  this.ref.close(this.model);
}

closeModal() {
  this.ref.close()
 }
}

