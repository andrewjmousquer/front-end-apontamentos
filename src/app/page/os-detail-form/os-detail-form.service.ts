import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OSDetailFormFactory } from './os-detail-form.factory';
import { ServiceOrderDashboardModel } from 'src/app/shared/model/service-order-dashboard.model';
import { TaskWithTimeModel } from 'src/app/shared/model/task-with-time.model';
import { TaskUserModel } from 'src/app/shared/model/task-user.model';
import { UserByTaskModel } from 'src/app/shared/model/user-by-task.model';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';

@Injectable({ providedIn: 'root' })
export class OSDetailFormService {

  constructor(private http: HttpClient, private factory: OSDetailFormFactory) { }

  getById(id: number) {
    return this.http.get<ServiceOrderDashboardModel>(`${environment.api}/protected/service-order/${id}`);
  }

  searchDetailsByAppointment(toSend: TaskWithTimeModel) {
    return this.http.post<AppointmentModel[]>(`${environment.api}/protected/task/appointments`, this.factory.convertToSearch(toSend));
  }

  appointmentEdit(task: AppointmentModel, dateStart: Date, dateFinish: Date) {
    return this.http.post<boolean>(`${environment.api}/protected/task/appointments/edit`, this.factory.convertToSave(task, dateStart, dateFinish));

  }

  listUsers(taskID: number) {
    return this.http.get<TaskUserModel[]>(`${environment.api}/protected/task/list-users/?task=${taskID}`);
  }

  startTask(taskID: number, usuarioID: number) {
    return this.http.get<TaskUserModel>(`${environment.api}/protected/task/start/?task=${taskID}&usuario=${usuarioID}`);
  }

  resumeTask(taskID: number, usuarioID: number) {
    return this.http.get<TaskUserModel>(`${environment.api}/protected/task/resume/?task=${taskID}&usuario=${usuarioID}`);
  }

  pauseTask(taskID: number, usuarioID: number) {
    return this.http.get<TaskUserModel>(`${environment.api}/protected/task/pause/?task=${taskID}&usuario=${usuarioID}`);
  }

  finishTask(taskID: number, usuarioID: number, movimentID: number) {
    return this.http.get<TaskUserModel>(`${environment.api}/protected/task/finish/?task=${taskID}&moviment=${movimentID}&usuario=${usuarioID}`);
  }

  getUsersAvalibleByTaskAndStage(taskID: number, stageID: number) {
    return this.http.get<UserByTaskModel[]>(`${environment.api}/protected/user/avalible-task/?task=${taskID}&stage=${stageID}`);
  }
}
