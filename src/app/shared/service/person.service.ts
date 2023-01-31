import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'
import { Person } from '../../shared/model/person.model'

@Injectable({ providedIn: 'root' })
export class PersonService {

  person: Person;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Person[]>(`${environment.api}/protected/person/listAll`);
  }
}
