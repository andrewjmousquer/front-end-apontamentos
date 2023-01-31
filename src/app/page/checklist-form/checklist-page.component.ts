import { Component, OnInit, ViewChild } from '@angular/core';
import { ChecklistPageListComponent } from './list/checklist-list.component';

@Component({
  selector: 'sbm-checklist-page',
  templateUrl: './checklist-page.component.html',
  styleUrls: ['./checklist-page.component.css']
})
export class ChecklistPageComponent implements OnInit {

  @ViewChild('list', { static: false }) list: ChecklistPageListComponent;

  constructor() {
  }

  ngOnInit() {

  }

  onReload() {
    this.list.reload();
  }

}
