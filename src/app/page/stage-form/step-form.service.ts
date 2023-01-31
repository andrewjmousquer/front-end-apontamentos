import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StageFormFactory } from './stage-form.factory';
import { Stage } from 'src/app/shared/model/stage.model';

@Injectable({ providedIn: 'root' })
export class StageService {

  parameter: Stage;

  constructor(private http: HttpClient, private factory: StageFormFactory) { }

  getAll() {
    return this.http.get<Stage[]>(`${environment.api}/protected/stage/listAll`);
  }

  getById(id: number) {
    return this.http.get<Stage>(`${environment.api}/protected/stage/${id}`);
  }

  search(Stage: Stage) {
    return this.http.post<Stage[]>(`${environment.api}/protected/stage/search`, Stage);
  }

  save(Stage: Stage) {
    return this.http.post<Stage>(`${environment.api}/protected/stage/save`, this.factory.convertToInsert(Stage));
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.api}/protected/stage/${id}`);
  }

  deleteMovement(id: number) {
    return this.http.delete<boolean>(`${environment.api}/protected/stage/movement/${id}`);
  }
}
