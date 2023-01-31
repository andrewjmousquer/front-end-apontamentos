import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OSViewFormService } from './os-view-form.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';


import { ClassifierService } from 'src/app/shared/service/classifier.service';
import { Classifier } from 'src/app/shared/model/classifier.model';

import { StageMovement } from 'src/app/shared/model/stage-movement.model';
import { Stage } from 'src/app/shared/model/stage.model';
import { Subject } from 'rxjs';
import { Checklist } from 'src/app/shared/model/checklist.model';
import { ChecklistService } from 'src/app/shared/service/checklist.service';
import { OsViewModel } from 'src/app/shared/model/os-viwer.model';
import { osViewListMock } from 'src/app/shared/mock/os-view-mock';
import { Router } from '@angular/router';
import { ServiceOrderModel } from 'src/app/shared/model/service-order.model';

@Component({
  selector: 'wbp-os-view-form',
  templateUrl: './os-view-form.component.html',
  styleUrls: ['./os-view-form.component.css']
})
export class OSViewFormComponent implements OnInit {
  loading = false;
  isEdit = false;

  cols: any[];

  osViewList: ServiceOrderModel[];
  osSearch: ServiceOrderModel = new ServiceOrderModel();

  @ViewChild('stageRegisterForm', { static: false }) stageRegisterForm: NgForm;
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private router: Router, private osService: OSViewFormService) { }

  ngOnInit() {

    this.loadOsList();

    this.cols = [
      { field: 'number', header: 'Nº da OS' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
      { field: 'plate', header: 'Placa' },
      { field: 'chassi', header: 'Chassi' },
      { field: 'status', header: 'Status' },
    ];

  }

  loadOsList() {
    this.loading = true;
    this.osService.getAll().pipe(first()).subscribe(res => {
      this.osViewList = res;
      this.loading = false;
    })
  }

  clear() {
    this.loading = true;
    this.osSearch = new ServiceOrderModel();
    this.osService.getAll().pipe(first()).subscribe(res => {
      this.osViewList = res;
      this.loading = false
    })
  }

  search() {
    this.loading = true;
    if (this.osSearch.number != null && this.osSearch.number != undefined && this.osSearch.number != "") {
      this.osService.search(this.osSearch).pipe(first()).subscribe(res => {
        this.osViewList = res;
        this.loading = false
      })
    } else {
      this.loadOsList();
      this.loading = false
    }

  }

  openDetail(osId: Number) {
    this.router.navigate(['/os-detail-form'], { queryParams: { osId: osId } })
  }

}
