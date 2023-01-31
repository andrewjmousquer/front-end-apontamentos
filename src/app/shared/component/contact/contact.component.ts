import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as _ from "lodash";

import { ConfirmationService, MessageService } from 'primeng/api';

import { ClassifierService } from '../../service/classifier.service';

import { Contact } from '../../model/contact.model';
import { Classifier } from '../../model/classifier.model';

import { Utils } from '../../../shared/util/util';

@Component({
  selector: 'wbp-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  loading: boolean = false;
  isEdit: boolean = false;
  isContactPhone = false;
  isContactEmail = false;
  isContactMobile = false;

  cols: any[];
  componentContactBackup: Contact;
  @Input() componentContact: Contact;
  @Input() componentContactList: Contact[];
  @Input() horizontal: boolean = false;
  contactTypeList: Classifier[] = [];

  util: Utils = new Utils();

  @ViewChild('contactForm', { static: false }) contactForm: NgForm;

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private classifierService: ClassifierService) { }

  ngOnInit() {
    this.cols = [
      { field: 'type', header: 'Tipo' },
      { field: 'value', header: 'Contato' },
      { field: 'complement', header: 'Complemento' }
    ];

    this.resetContactForm();

    this.classifierService.searchByType("CONTACT_TYPE").pipe(first()).subscribe(data => {
      this.contactTypeList = data;
      this.contactTypeList.map(contact => {
        contact.value = Utils.titlecase(contact.value);
        return contact;
      });
    });
  }

  changeContactType() {
    if(this.componentContact){
      if (this.componentContact.type.value?.toUpperCase() == "EMAIL") {
        this.isContactEmail = true;
        this.isContactPhone = false;
        this.isContactMobile = false;
      } else if (this.componentContact.type.value?.toUpperCase() == "CELULAR") {
        this.isContactEmail = false;
        this.isContactPhone = false;
        this.isContactMobile = true;
      } else if (this.componentContact.type.value?.toUpperCase() == "TELEFONE") {
        this.isContactEmail = false;
        this.isContactPhone = true;
        this.isContactMobile = false;
      } else {
        this.isContactEmail = false;
        this.isContactPhone = false;
        this.isContactMobile = false;
      }
    }
  }

  resetContactForm() {
    this.componentContact = new Contact();
    this.componentContact.type = new Classifier()
    this.isContactPhone = false;
    this.isContactEmail = false;
    this.isContactMobile = false;
    this.changeContactType();
  }

  newContactForm() {
    if (this.isEdit) {
      this.confirmationService.confirm({
        message: `Deseja salvar as alterações de ${this.componentContact.type.value}?`,
        header: 'Excluir registro',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.addContact();
        },
        reject: () => {
          this.componentContact = _.clone(this.componentContactBackup);
          this.addContact();
        }
      });
    } else {
      this.resetContactForm();
    }
  }

  addContact() {
    let valid: boolean = true;
    if (this.componentContact.type.id == undefined || this.componentContact.type.id == 0) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro ao adicionar contato', detail: 'Selecion um tipo de contato!' });
      return;
    }

    if (this.componentContact.value == undefined || this.componentContact.value == null) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro ao adicionar contato', detail: 'Digite o contato!' });
      return;
    }

    if (this.componentContactList.length > 0) {
      this.componentContactList.forEach(item => {
        if (item.value == this.componentContact.value) {
          this.messageService.add({ key: 'tst', severity: 'info', summary: 'Contato existente', detail: 'Esse contato já existe' });
          valid = false;
        }
      });
    }

    if (valid) {
      this.componentContactList.push(this.componentContact);
      this.resetContactForm();
    }
  }

  editContact(event) {
    let contact = event.data;
    this.componentContactBackup = _.clone(contact);
    this.componentContact = contact;
    this.isEdit = true;
    this.changeContactType();

    let index = this.componentContactList.indexOf(contact);
    this.componentContactList = this.componentContactList.filter((val, i) => i != index);
  }

  removeContact(contact: Contact) {
    this.confirmationService.confirm({
      message: `Deseja remover ${contact.value}?`,
      header: 'Excluir registro',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        let index = this.componentContactList.indexOf(contact);
        this.componentContactList.splice(index, 1)
      }
    });
  }
}
