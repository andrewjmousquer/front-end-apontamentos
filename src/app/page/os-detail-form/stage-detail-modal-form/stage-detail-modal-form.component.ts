import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { GeneratePdfComponent } from 'src/app/shared/component/generate-pdf/generate-pdf.component';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';
import { OSDetailFormService } from '../os-detail-form.service';


@Component({
  selector: 'wbp-stage-detail-modal-form',
  templateUrl: './stage-detail-modal-form.component.html',
  styleUrls: ['./stage-detail-modal-form.component.css']
})
export class StageDetailModalFormComponent implements OnInit {

  task: AppointmentModel = new AppointmentModel();
  dateStart: Date;
  dateFinish: Date;

  @ViewChild('stageDetailForm', { static: false }) stageDetailForm: NgForm;
  constructor(public config: DynamicDialogConfig, 
              public ref: DynamicDialogRef, 
              public service: OSDetailFormService, 
              private messageService: MessageService, 
              private dialogService: DialogService
              ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.task = this.config.data.data;
    this.dateStart = new Date(this.task.dateStart.toLocaleString("en-US", { timeZone: 'America/Sao_Paulo' }));
    this.dateFinish = new Date(this.task.dateFinish.toLocaleString("en-US", { timeZone: 'America/Sao_Paulo' }));
    
  }

  save() {
    this.service.appointmentEdit(this.task, this.dateStart, this.dateFinish).pipe(first()).subscribe(res => {
      if (res == true) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Feito!', detail: 'Apontamento alterado com sucesso!' });
        this.ref.close('resetLists');
      }

    })
  }

  printReceipt(task: any){
    this.ref = this.dialogService.open(GeneratePdfComponent, {
      data: {taskByUser: task, screen: 'appointment'},
      width: '100%',
      style: {visibility: 'hidden'}
    });
  }

  closeModal() {
    this.ref.close(null);
  }


}
