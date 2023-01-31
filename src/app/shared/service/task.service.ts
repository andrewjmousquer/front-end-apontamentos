import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TaskUserModel } from "../model/task-user.model";
import { TaskModel } from "../model/task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private http: HttpClient) {}

  getByUser(taskId: number) {
    return this.http.get<TaskModel>(
      `${environment.api}/protected/task/by-user/?taskID=${taskId}`);
  }

  listUsers(taskId: number){
    return this.http.get<TaskUserModel[]>(
      `${environment.api}/protected/task/list-users/?task=${taskId}`);
  }

  startTask(taskId: number) {
    return this.http.get(
      `${environment.api}/protected/task/start/?task=${taskId}`
    );
  }

  resumeTask(taskId: number) {
    return this.http.get(
      `${environment.api}/protected/task/resume/?task=${taskId}`
    );
  }

  pauseTask(taskId: number) {
    return this.http.get(
      `${environment.api}/protected/task/pause/?task=${taskId}`
    );
  }

  finishTask(taskId: number, movimentID: number) {
    return this.http.get<TaskUserModel>(
      `${environment.api}/protected/task/finish/?task=${taskId}&moviment=${movimentID}`
    );
  }
}
