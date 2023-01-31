import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';

import { CheckListAnswerService } from 'src/app/shared/service/checklist-answer.service';

import { CheckListAnswerModel } from 'src/app/shared/model/checklist-answer.model';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css'],
  providers: [DialogService]
})
export class CommentViewComponent implements OnInit {

  isLoading: boolean;
  model: CheckListAnswerModel = new CheckListAnswerModel();
  header: string;
  answer: CheckListAnswerModel

  images: Blob;
  fileName: string;

  constructor(

    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private cklAnswerService: CheckListAnswerService
  ) { }

  ngOnInit(): void {
    this.model = this.config.data.model; 
    this.loadAnswered();
    
  }

  loadAnswered(){
  this.cklAnswerService.getById(this.model.id).pipe(first()).subscribe(
      data => {
        this.answer = data; 
      }
    )
}  

//   commentChecklist() {
//     if (this.model.answer.id == 43 || this.model.id == 0) {
//         if (this.model.blobImages) {
//             this.saveCloseModal();
//         } else {
//           this.messageService.add({ key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Foto é obrigatória em caso de NOK ' });
//         }
//     } else {
//         this.messageService.add({ key: 'tst', severity: 'success', summary: 'Salvo', detail: 'Checklist salvo com sucesso!' });  
//         this.saveCloseModal();
//     }
// }

//   saveCloseModal() {
//   this.ref.close(this.model)
// }

 closeModal() {
  this.ref.close()
 }
}
