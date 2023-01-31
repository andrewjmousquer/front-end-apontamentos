import { Component, OnInit, } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';

import { GeneratePdfComponent } from 'src/app/shared/component/generate-pdf/generate-pdf.component';

import { OSDetailFormService } from '../os-detail-form.service';

import { StageMovement } from 'src/app/shared/model/stage-movement.model';
import { TaskUserModel } from 'src/app/shared/model/task-user.model';
import { AppComponent } from 'src/app/app.component';
import { ConsultOSFormComponent } from '../../consult-os-form/consult-os-form.component';

@Component({
  selector: 'wbp-choose-moviment-modal-form',
  templateUrl: './choose-moviment-modal-form.component.html',
  styleUrls: ['./choose-moviment-modal-form.component.css'],
  providers: [DialogService]
})
export class ChooseMovimentModalFormComponent implements OnInit {
  hasLogoutOnAction: boolean;

  movements: StageMovement[];
  task: TaskUserModel = new TaskUserModel();
  selectedMovement: StageMovement;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public service: OSDetailFormService, 
    private messageService: MessageService,
    private dialogService: DialogService,
    private app: AppComponent,
    private consultOS: ConsultOSFormComponent) { }



  ngOnInit() {
    this.movements = this.config.data.movements;
    this.task = this.config.data.task;
    this.hasLogoutOnAction = this.config.data.action

    this.consultOS.pauseTimer();
  }

  changeStage() {
    if (this.selectedMovement != null) {
      this.service.finishTask(this.task.task.id, this.task.user, this.selectedMovement.id).pipe(first()).subscribe(res => {
        if (res) {
          this.closeModal('insert');
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Feito:', detail: 'Tarefa finalizada com sucesso!' });
          this.generateProof(res);
        }
      })
    } else {
      this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Atenção:', detail: 'É necessário escolher uma etapa antes de prosseguir!' });
    }
  }

  generateProof(task: TaskUserModel){
    this.ref = this.dialogService.open(GeneratePdfComponent, {
        data: {taskByUser: task, action: this.hasLogoutOnAction},
        width: '100%',
        style: {visibility: 'hidden'}
      });
}


  closeModal(status) {
    if (status == null){
      this.ref.close();
    }
    else
      this.consultOS.resetSearchForm();
      this.ref.close(status);
  }


}
