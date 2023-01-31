import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistService } from 'src/app/shared/service/checklist.service';

@Component({
  selector: 'sbm-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.css']
})
export class ChecklistItemComponent implements OnInit {

  checklist: Checklist = {};

  @Input()
  disabled: boolean = true;
  @Input()
  checklistSavedsList: Checklist[];

  @Output()
  onReload: EventEmitter<void> = new EventEmitter();

  @ViewChild('form', { static: false }) form: any;

  constructor(
    private confirmationService: ConfirmationService,
    private checklistService: ChecklistService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.novo();
  }

  @Input('checklist')
  set checklistSelected(checklist: Checklist) {
    this.checklist = {};
    if (checklist)
      this.reload(checklist.id);
  }

  novo() {
    this.checklist = {};
    this.disabled = false;
    if (this.form != null && this.form != undefined)
      this.form.reset();
  }

  save(checklist: Checklist) {
    this.checklistService.saveOrUpdate(checklist)
      .pipe(first())
      .subscribe(data => {
        const message = checklist.id ? 'atualizado' : 'adicionado';
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Salvo com sucesso',
          detail: `Registro ${message} com sucesso!`
        });
        this.clear();
      },
        this.onResponseError
      );
  }

  cancel(checklist) {
    this.reload(checklist.id);

  }

  remove(checklist) {
    this.confirmationService.confirm({
      message: `Deseja remover ${checklist.name}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.checklistService.delete(checklist.id)
          .pipe(first()).
          subscribe(
            (data) => {
              this.messageService.add({ key: 'tst', severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
              this.clear()
            },
            this.onResponseError
          );
      }
    });
  }

  private clear() {
    this.onReload.emit();
    this.checklist = {};
    this.disabled = true;
  }

  private reload(id: number) {
    this.checklistService
      .getById(id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.checklist = Object.assign({ groups: [] }, data);
        },
        this.onResponseError
      );
  }

  private onResponseError(error) {
    this.messageService.add({
      key: 'tst',
      severity: 'error',
      summary: 'Erro',
      detail: error,
    });
  }

}
