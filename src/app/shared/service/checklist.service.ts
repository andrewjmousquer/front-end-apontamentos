import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Checklist } from '../model/checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Checklist[]>(`${environment.api}/protected/checklist/listAll`);
  }

  search(checklist: Checklist) {
    return this.http.post<Checklist[]>(`${environment.api}/protected/checklist/search`, checklist);
  }

  getById(id: number) {
    return this.http.get<Checklist>(`${environment.api}/protected/checklist/${id}`);
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.api}/protected/checklist/${id}`);
  }

  saveOrUpdate(checklist: Checklist) {
    return this.http.post<Checklist>(`${environment.api}/protected/checklist/`, checklist);
  }

  getAnswerByChecklist(id: number) {
    return this.http.get(`${environment.api}/protected/checklist/answerByChecklist/${id}`)
  }

  
}
