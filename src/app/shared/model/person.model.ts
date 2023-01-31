import { Contact } from './contact.model';

export class Person {
  public id: number;
  public name: string;
  public jobTitle: string;
  public cpf: string;
  public cnpj: string;
  public rne: string;
  public rg: string;
  public classification: string;
  public contacts: Contact[];
  public birthdate: Date;
}
