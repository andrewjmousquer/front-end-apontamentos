import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as _ from "lodash";
import { ConfirmationService, MessageService } from 'primeng/api';

import { TeamFormService } from './team-form.service';
import { UsersTeamService } from './../../shared/service/users-team-form.service';
import { StageService } from '../stage-form/step-form.service';

import { Team } from './../../shared/model/team.model';
import { UsersTeam } from './users-team-form.model';
import { Stage } from './../../shared/model/stage.model';



@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
})
export class TeamFormComponent implements OnInit {
  loading = false;
  isEdit = false;
  isRequired = false;

  userAvailableList: UsersTeam[];
  userSelectedList: UsersTeam[];
  userList: UsersTeam[];

  stageAvaliableList: Stage[];
  stageSelectedList: Stage[];
  stageList: Stage[];

  modelList: Team[];
  modelSearch: Team;
  modelRegister: Team;

  cols: any[];

  clearEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('registerForm', { static: false }) registerForm: NgForm;
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private teamService: TeamFormService,
    private usersService: UsersTeamService,
    private stageService: StageService
  ) {
  }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Equipe' },
      { field: 'numberOfUsers', header: 'Participantes' },
      { field: 'numberOfStages', header: 'Etapas' }
    ];

    this.resetSearchForm();
    this.resetRegisterForm();

  }

  listTeams() {
    this.teamService.getAll().pipe(first()).subscribe(data => {
      this.modelList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  listUsers() {
    this.usersService.getUsers().pipe(first()).subscribe(data => {
      this.userList = data
      this.userAvailableList = this.userList;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  listStages() {
    this.stageService.getAll().pipe(first()).subscribe(data => {
      this.stageList = data;
      this.stageAvaliableList = this.stageList;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  resetSearchForm() {
    this.listTeams();
    this.modelSearch = new Team();
  }

  search() {
    if (this.modelSearch.name) {
      this.teamService.search(this.modelSearch).pipe(first()).subscribe(data => {
        this.modelList = data;
      }, error => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      });
    } else {
      this.teamService.getAll().pipe(first()).subscribe(data => {
        this.modelList = data;
      }, error => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      });
    }
  }

  edit(event) {
    this.isEdit = true;
    this.teamService.getById(event.data.id).pipe(first()).subscribe(data => {
      this.modelRegister = data;

      this.fillUserToEdit();
      this.fillStageToEdit();

    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  fillStageToEdit() {
    if (this.modelRegister.stages) {
      this.stageAvaliableList = [];
      this.stageSelectedList = this.modelRegister.stages;

      this.stageList.forEach(itemBD => {
        let insertItem: boolean = true;
        this.stageSelectedList.forEach(itemView => {
          if (insertItem == true) {
            if (itemBD.id == itemView.id) {
              insertItem = false;
            }
          }
        })

        if (insertItem == true) {
          this.stageAvaliableList.push(itemBD);
        }
      });
    } else {
      this.stageSelectedList = this.stageList;
    }
  }


  fillUserToEdit() {
    if (this.modelRegister.users) {
      this.userAvailableList = [];
      this.userSelectedList = this.modelRegister.users;

      this.userList.forEach(itemBD => {
        let insertItem: boolean = true;
        this.userSelectedList.forEach(itemView => {
          if (insertItem == true) {
            if (itemBD.id == itemView.id) {
              insertItem = false;
            }
          }
        })
        if (insertItem == true) {
          this.userAvailableList.push(itemBD);
        }
      });
    } else {
      this.userAvailableList = this.userList;
    }
  }

  remove(model: Team) {
    this.confirmationService.confirm({
      message: `Deseja remover ${model.name}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.teamService.delete(model.id).pipe(first()).subscribe(data => {
          this.messageService.add({ key: 'tst', severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
          this.resetSearchForm();
          this.resetRegisterForm();
          this.registerForm.reset();
        }, error => {
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
        });
      }
    });
  }

  save() {
    let message = this.modelRegister.id ? 'atualizado' : 'adicionado';
    if (this.userSelectedList != null && this.userSelectedList.length > 0) {
      this.modelRegister.users = this.userSelectedList;
    }
    if (this.stageSelectedList != null && this.stageSelectedList.length > 0) {
      this.modelRegister.stages = this.stageSelectedList;
    }

    this.teamService.saveOrUpdate(this.modelRegister).pipe(first()).subscribe(data => {
      this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Salvo com sucesso',
        detail: `Registro ${message} com sucesso!`
      });
      this.resetSearchForm();
      this.resetRegisterForm();
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  resetRegisterForm() {
    this.isEdit = false;
    this.modelRegister = new Team();
    this.userAvailableList = _.clone(this.userList);
    this.userSelectedList = [];
    this.stageAvaliableList = _.clone(this.stageList);
    this.stageSelectedList = [];
    this.listUsers();
    this.listStages();

    if (this.registerForm != null && this.registerForm != undefined)
      this.registerForm.reset();
  }
}