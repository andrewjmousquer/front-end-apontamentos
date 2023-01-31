import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderList } from 'primeng/orderlist';
import { ChecklistGroup } from 'src/app/shared/model/checklistGroup.model';
import { ChecklistQuestion } from 'src/app/shared/model/checklistQuestion.model';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'sbm-checklist-item-question',
  templateUrl: './checklist-item-question.component.html',
  styleUrls: ['./checklist-item-question.component.css']
})
export class ChecklistItemQuestionComponent implements OnInit {

  question: ChecklistQuestion = {};

  adicionando: boolean = false;

  questionSelected: ChecklistQuestion;

  @Input()
  disabled: boolean = true;

  @ViewChild('orderList', { static: false }) orderList: OrderList;

  private _group: ChecklistGroup;


  constructor(private messageService: MessageService) { }
  ngOnInit() { }

  @Input()
  set group(group: ChecklistGroup) {
    this._group = group;
    this._group && (this._group.questions || []).forEach(question => question.guid = uuidv4());
  }

  get group(): ChecklistGroup {
    return this._group;
  }

  novo() {
    this.question = {};
    this.adicionando = true;
  }

  delete(group, question) {
    const questions = group.questions || [];
    const index = questions.findIndex((item) => item.guid === question.guid);
    if (index >= 0)
      questions.splice(index, 1);
      group.questions  = [...group.questions || []]
  }

  cancelar() {
    this.question = {};
    this.adicionando = false;
  }

  salvar(group, question) {

    if (group.questions != undefined && group.questions != null && group.questions.some(e => e.question === question.question)) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: "Já existe um item com este nome!" });
    } else {
      question.guid = uuidv4();
      group.questions = [...group.questions || [], question];
      this.adicionando = false;
    }

  }

  onSelectionChange(event) {
    this.questionSelected = event.value[0];
  }


}
