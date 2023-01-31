import { Component, OnInit, Input, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from "lodash";

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { StageService } from 'src/app/page/stage-form/step-form.service';
import { Classifier } from '../../model/classifier.model';

import { StageMovement } from '../../model/stage-movement.model';

import { Utils } from '../../util/util';
@Component({
  selector: 'wbp-stage-movements',
  templateUrl: './stage-movements.component.html'
})
export class StageMovementComponent implements OnInit {

  loading: boolean = false;
  isEdit: boolean = false;

  cols: any[];
  componentUserBackup: StageMovement;
  @Input() movementsSavedsList: StageMovement[];
  @Input() horizontal: boolean = false;
  @Input() typeList: Classifier[] = [];
  @Input() eventClear: EventEmitter<any>;

  movement: StageMovement = new StageMovement();

  util: Utils = new Utils();

  @ViewChild('stageForm', { static: false }) stageForm: NgForm;
  @ViewChild('tableMovements') tabeMovements: Table;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private stageService: StageService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Nome', filter: 'name' }, 
      { field: 'icon', header: 'Ícone', filter: 'icon' }, 
      { field: 'jiraID', header: 'Jira ID', filter: 'jiraID' }, 
      { field: 'type', header: 'Tipo', filter: 'type.value' }
    ];

    this.resetMovementForm();
  }

  ngOnChanges() {
    this.eventClear.subscribe(data => {
      this.resetMovementForm();
    })
  }

  resetMovementForm() {
    this.movement = new StageMovement();
    this.movement.type = new Classifier(); 
    if (this.stageForm != undefined && this.stageForm != null)
      this.stageForm.reset();
  }

  addMovement() {
    let valid: boolean = true;
    if (this.movement.type.id == undefined || this.movement.type.id == 0) {
      this.messageService.add({
        key: "tst",
        severity: "error",
        summary: "Erro ao adicionar uma movimentação a etapa",
        detail: "Selecione o tipo de movimentação!",
      });
      return;
    }

    if (this.movement.jiraID == undefined || this.movement.jiraID == null) {
      this.messageService.add({
        key: "tst",
        severity: "error",
        summary: "Erro ao adicionar uma movimentação a etapa",
        detail: "ID do JIRA é obrigatório!",
      });
      return;
    }

    if (this.movementsSavedsList != undefined && this.movementsSavedsList.length > 0) {
      if (this.movement.type.value == 'START' || this.movement.type.value == 'PAUSE') {
       let exists = this.movementsSavedsList.some(moviment => moviment.type.value == this.movement.type.value) 
       
       if (exists) {
        valid = false;
        this.messageService.add({
          key: "tst",
          severity: "info",
          summary: "Movimentação existente",
          detail: `Já existe uma movimentação do tipo ${this.movement.type.value} na etapa!`,
        });
       }
      }
    }
    if (valid) {
      this.movementsSavedsList.push(this.movement);
      this.resetMovementForm();
    }
  }

  editMovement(event) { 
    if (event != null && event != undefined) {
      let contact = event.data;
      this.componentUserBackup = _.clone(contact);
      this.movement = contact;
      this.isEdit = true;

    }
  }

  removeMovement(stage: StageMovement) {
    this.confirmationService.confirm({
      message: `Deseja remover ${stage.name}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {             
        if (stage.id != null && stage.id != undefined && stage.id > 0) {
          this.stageService.deleteMovement(stage.id).pipe(first()).subscribe(
            data => {
            this.messageService.add({ key: 'tst', severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
            let index = this.movementsSavedsList.indexOf(stage);
            this.movementsSavedsList.splice(index, 1);
            this.movementsSavedsList = [...this.movementsSavedsList];
            this.tabeMovements.reset();
          }, error => {
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
          });
        } else {
          let index = this.movementsSavedsList.indexOf(stage);
          this.movementsSavedsList.splice(index, 1);
          this.movementsSavedsList = [...this.movementsSavedsList];
          this.tabeMovements.reset();
          this.resetMovementForm();
        }
      }
    });
  }
}
