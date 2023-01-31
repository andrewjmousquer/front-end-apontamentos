import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistService } from 'src/app/shared/service/checklist.service';

@Component({
  selector: 'sbm-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css'],
})
export class ChecklistPageListComponent implements OnInit {
  cols = [
    { field: 'name', header: 'Nome' },
    { field: 'numberOfGroups', header: 'Grupos' },
    { field: 'numberOfQuestions', header: 'Itens' },
  ];

  checklists = [];

  checklistSearch: any = {};

  @Output("checkListSelected")
  checkListSelected: Checklist;

  @ViewChild('searchForm', { static: false })
  searchForm: any;

  constructor(
    private checklistService: ChecklistService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.reload();
  }

  search(searchModel) {
    this.checklistService
      .search(searchModel)
      .pipe(first())
      .subscribe(
        (data) => {
          this.checklists = data || [];
        },
        this.onResponseError
      );
  }

  onRowSelect(event) {

  }

  onRowUnselect() {
    this.checkListSelected = undefined;
  }

  reset() {
    this.checklistSearch = {};
  }

  reload() {
    this.checklistService
      .getAll()
      .pipe(first())
      .subscribe(
        (data) => {
          this.checkListSelected = undefined;
          this.checklists = data || [];
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
