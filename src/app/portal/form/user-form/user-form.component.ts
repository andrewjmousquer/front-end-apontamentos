import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NgxSpinnerService } from "ngx-spinner";

import { UserFormService } from './user-form.service';
import { AccessListService } from '../../../shared/service/access-list.service';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { ClassifierService } from '../../../shared/service/classifier.service';
import { CustomerService } from '../../../shared/service/customer.service';
import { UserService } from '../../../shared/service/user.service';

import { User } from '../../../shared/model/user.model';
import { AccessList } from '../../../shared/model/access-list.model';
import { Contact } from '../../../shared/model/contact.model';
import { Classifier } from '../../../shared/model/classifier.model';
import { Customer } from '../../../shared/model/customer.model';
import { Person } from '../../../shared/model/person.model';

@Component({
  selector: 'wbp-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  isEdit = false;

  accessListList: AccessList[];
  contactList: Contact[];
  contactTypeList: Classifier[];
  customerList: Customer[];
  customerAvailableList: Customer[];
  customerSelectedList: Customer[];
  userList: User[];
  selectedUserList: User[];
  userTypeList: Classifier[];
  items: MenuItem[];
  cols: any[];

  home: MenuItem;
  userSearch: User;
  userRegister: User;
  contact: Contact;
  display: boolean = false;


  @ViewChild('userRegisterForm', { static: false }) userRegisterForm: NgForm;
  @ViewChild('dt', { static: false }) dt: any;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userFormService: UserFormService,
    private accessListService: AccessListService,
    private classifierService: ClassifierService,
    private customerService: CustomerService,
    private userService: UserService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.cols = [
      { field: 'username', header: 'Usuário' },
      { field: 'person', header: 'Nome' },
      { field: 'userType', header: 'Tipo' }
    ];

    this.resetSearchForm();
    this.resetRegisterForm();
    this.loadCombos();
  }

  loadCombos() {
    this.userService.getAll().pipe(first()).subscribe(data => {
      this.userList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.accessListService.getAll().pipe(first()).subscribe(data => {
      this.accessListList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.classifierService.searchByType("CONTACT_TYPE").pipe(first()).subscribe(data => {
      this.contactTypeList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.customerService.getAll().pipe(first()).subscribe(data => {
      this.customerList = data;
      this.customerAvailableList = this.customerList;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });

    this.classifierService.searchByType("USER_TYPE").pipe(first()).subscribe(data => {
      this.userTypeList = data;
    }, error => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  resetSearchForm() {
    this.userSearch = new User();
    this.userSearch.person = new Person();
    this.userSearch.userType = new Classifier();
    this.userSearch.customer = new Customer();

    this.loadCombos();
  }

  search(event) {
    this.spinner.show();
    if (event && event.first) {
      this.userSearch.first = event.first;
    } else {
      if (this.dt) this.dt._first = 0;
      this.userSearch.first = 0;
    }
    this.userFormService.search(this.userSearch).pipe(first()).subscribe(data => {
      this.userList = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  edit(event) {
    this.spinner.show();
    this.resetRegisterForm();
    let user = event.data;
    this.userFormService.getById(user.id).pipe(first()).subscribe(data => {
      this.userRegister = data;
      this.isEdit = true;
      if (this.userRegister.customers) {
        this.customerAvailableList = [];
        this.customerSelectedList = this.userRegister.customers;

        this.customerList.forEach(itemBD => {
          let insertItem: boolean = true;
          this.customerSelectedList.forEach(itemView => {
            if (insertItem == true) {
              if (itemBD.id == itemView.id) {
                insertItem = false;
              }
            }
          })
          if (insertItem == true) {
            this.customerAvailableList.push(itemBD);
          }
        });
      }

      if (this.userRegister.contacts) {
        this.contactList = this.userRegister.contacts;
      }
      this.contact = new Contact();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
    });
  }

  remove(user: User) {
    this.confirmationService.confirm({
      message: `Deseja remover ${user.username}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.spinner.show();
        this.userFormService.delete(user.id).pipe(first()).subscribe(data => {
          this.spinner.hide();
          this.messageService.add({ key: 'tst', severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
          this.resetSearchForm();
          this.resetRegisterForm();
          this.userRegisterForm.reset();
        }, error => {
          this.spinner.hide();
          this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
        });
      }
    });
  }

  save() {
    let valid = true;
    if (this.userRegister.changePass == true || this.isEdit == false) {
      if (this.userRegister.password == "" || this.userRegister.password == undefined || this.userRegister.password == null ||
        this.userRegister.confirmPassword == "" || this.userRegister.confirmPassword == undefined || this.userRegister.confirmPassword == null) {
        this.messageService.add({ key: 'tst', severity: 'info', summary: 'Senha', detail: 'É necessário digitar uma senha!' });
        valid = false;
      } else if (this.userRegister.password != this.userRegister.confirmPassword) {
        this.messageService.add({ key: 'tst', severity: 'info', summary: 'Senha', detail: 'As senhas devem ser iguais!' });
        valid = false;
      }
    }

    if (this.contactList != null) {
      if (this.contactList.length > 0) {
        this.userRegister.contacts = this.contactList;
      }
    }

    if (this.customerSelectedList != null) {
      if (this.customerSelectedList.length > 0) {
        this.userRegister.customers = this.customerSelectedList;
      }
    }

    if (valid) {
      this.spinner.show();
      this.userFormService.save(this.userRegister).pipe(first()).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Salvo com sucesso', detail: `Registro adicionado com sucesso!` });
        this.resetSearchForm();
        this.resetRegisterForm();
        this.userRegisterForm.reset();
      }, error => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
      });
    }
  }

  resetRegisterForm() {
    this.isEdit = false;
    this.contact = new Contact();
    this.contactList = [];
    this.customerSelectedList = [];
    this.customerAvailableList = this.customerList;
    this.userRegister = new User();
    this.userRegister.person = new Person();
    this.userRegister.customers = [];
  }

  showDialog() {
    this.display = true;
  }


}
