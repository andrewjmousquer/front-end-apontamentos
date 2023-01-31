import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { Classifier } from 'src/app/shared/model/classifier.model';
import { StageMovement } from 'src/app/shared/model/stage-movement.model';
import { Stage } from 'src/app/shared/model/stage.model';
import { ClassifierService } from 'src/app/shared/service/classifier.service';
import { AppointmentService } from 'src/app/shared/service/appointment.service';
import { StageService } from '../../stage-form/step-form.service';


@Component({
  selector: 'wbp-special-service-modal-form',
  templateUrl: './special-service-modal-form.component.html',
  styleUrls: ['./special-service-modal-form.component.css']
})
export class SpecialServiceModalFormComponent implements OnInit {

  numberOs: number;
  taskId: number;
  stage: Stage;
  movementList: StageMovement[];
  descriptionMovimentList: Classifier[];
  selectedStage: number[];
  selectedMovement: number;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public service: StageService,
    public classifierService: ClassifierService,
    public appointmentService: AppointmentService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.numberOs = this.config.data.data;
    this.stage = this.config.data.stage;
    this.taskId = this.config.data.taskId;

    this.loadCombos();

  }
  loadCombos() {

    this.movementList = this.stage.moviments.filter(movement => movement.type.value === "SPECIAL");

    this.classifierService.searchByType('SPECIAL_MOVEMENT_DESCRIPTION_TYPE').pipe(first()).subscribe(res => {
      if (res) {
        this.descriptionMovimentList = res
      }
    })
  }

  closeModal(status: string) {
    this.ref.close(status);
  }

  saveSpecialService() {
    if (this.selectedMovement != null && this.selectedStage.length > 0) {
      this.appointmentService.insertSpecialService(this.taskId, this.selectedMovement, this.selectedStage).pipe(first()).subscribe(res => {
        if (res == true) {
          this.closeModal('insert')
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Confirmado!', detail: 'Tarefa inserida com sucesso!' });
        }
      }, err => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Confirmado!', detail: err });
      })
    }
  }

}
