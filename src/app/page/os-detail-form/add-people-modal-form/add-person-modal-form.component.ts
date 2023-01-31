import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { TaskUserModel } from 'src/app/shared/model/task-user.model';
import { TaskWithTimeModel } from 'src/app/shared/model/task-with-time.model';
import { UserByTaskModel } from 'src/app/shared/model/user-by-task.model';
import { User } from 'src/app/shared/model/user.model';
import { OSDetailFormService } from '../os-detail-form.service';


@Component({
  selector: 'wbp-add-person-modal-form',
  templateUrl: './add-person-modal-form.component.html',
  styleUrls: ['./add-person-modal-form.component.css']
})
export class AddPersonModalFormComponent implements OnInit {

  task: TaskWithTimeModel = new TaskWithTimeModel();
  people: UserByTaskModel[];
  selectedPerson: UserByTaskModel = new UserByTaskModel();
  cols: any[];

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private service: OSDetailFormService, private messageService: MessageService) { }

  ngOnInit() {
    this.task = this.config.data.data;
    this.cols = [
      { field: 'name', header: 'Nome' },
    ];
    this.loadPeople();
  }

  loadPeople() {
    this.service.getUsersAvalibleByTaskAndStage(this.task.id, this.task.stage.id).pipe(first()).subscribe(res => {
      this.people = res
    })
  }

  closeModal(status: string) {
    this.ref.close(status);
    this.people = [];
  }

  insertPeople() {
    if (this.selectedPerson.id != null) {
      this.service.startTask(this.task.id, this.selectedPerson.id).pipe(first()).subscribe(res => {
        if (res) {
          this.closeModal('insert');
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Confirmado!', detail: 'Usuário adicionado com sucesso!' });
        }
      }, err => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro!', detail: err });
      })
    }
  }

}
