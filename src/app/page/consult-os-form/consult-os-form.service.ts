import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskModel } from "src/app/shared/model/task.model";
import { TaskUserModel } from "src/app/shared/model/taskUser.model";
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class ConsultOsService {

    constructor(private http: HttpClient) { }

      getByOsChassi (osOrChassi: string) {
        return this.http.get<TaskModel[]>(`${environment.api}/protected/task/osOrChassi/?osOrChassi=${osOrChassi}`);
      }

      getTaskUser () {
        return this.http.get<TaskUserModel[]>(`${environment.api}/protected/task/by-user`);
      }

      listAvalible () {
        return this.http.get<TaskModel[]>(`${environment.api}/protected/task/user/avalible`);
      }

      listInProgress () {
        return this.http.get<TaskUserModel[]>(`${environment.api}/protected/task/user/progress`);
      }

}