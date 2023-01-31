import { Component, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderList } from 'primeng/orderlist';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistGroup } from 'src/app/shared/model/checklistGroup.model';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'sbm-checklist-item-group',
  templateUrl: './checklist-item-group.component.html',
  styleUrls: ['./checklist-item-group.component.css']
})
export class ChecklistItemGroupComponent implements OnInit {

  adicionando: boolean = false;

  group: ChecklistGroup = {};

  @Input()
  disabled: boolean = true;

  @Output('groupSelected')
  groupSelected: ChecklistGroup;

  @ViewChild('orderList', { static: false }) orderList: OrderList;

  private _checklist: Checklist;

  constructor(private messageService: MessageService) { }

  ngOnInit() {}

  @Input()
  set checklist(checklist: Checklist) {
    this._checklist = checklist;
    this._checklist && (this._checklist.groups || []).forEach(group => group.guid = uuidv4());
    this.groupSelected = undefined;
  }

  get checklist(): Checklist {
    return this._checklist;
  }

  novo() {
    this.group = {};
    this.adicionando = true;
  }

  delete(checklist, group) {
    const groups = checklist.groups || [];
    const index = groups.findIndex((item) => item.guid === group.guid);
    if (index >= 0)
      groups.splice(index, 1);
      checklist.groups = [...checklist.groups || []]
  }

  cancelar() {
    this.group = {};
    this.adicionando = false;
  }

  salvar(checklist, group) {
    if (checklist.groups != undefined && checklist.groups != null && checklist.groups.some(e => e.name === group.name)) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: "Já existe um grupo com este nome!" });
    } else {
    group.guid = uuidv4();
    checklist.groups = [...checklist.groups || [], group];
    this.adicionando = false;
  }
}

  onSelectionChange(event) {
    this.groupSelected = event.value[0];
  }

}
