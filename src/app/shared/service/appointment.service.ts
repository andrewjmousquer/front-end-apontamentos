import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConsultOSFactory } from "src/app/page/consult-os-form/consult-os-form-modal/consult-os-form.factory";
import { OSDetailFormFactory } from "src/app/page/os-detail-form/os-detail-form.factory";
import { environment } from '../../../environments/environment';
import { AppointmentModel } from "../model/appointment.Model";
import { SearchAppointmentModel } from "../model/search-appointments.model";
import { TaskModel } from "../model/task.model";



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private osDetailFactory: OSDetailFormFactory, private factory: ConsultOSFactory) { }

  searchObject(appointmentModel: SearchAppointmentModel) {
    return this.http.post<AppointmentModel[]>(`${environment.api}/protected/task/appointments`, appointmentModel);
  }

  searchDetailsByAppointment(toSend: TaskModel) {
    return this.http.post<AppointmentModel[]>(`${environment.api}/protected/task/appointments`, this.factory.convertToSearch(toSend));
  }

  appointmentEdit(appointmentModel: AppointmentModel) {
    return this.http.post<Boolean>(`${environment.api}/protected/task/appointments/edit`, appointmentModel);
  }

  exportappointments(appointmentModel: SearchAppointmentModel) {
    const options  = {
      responseType: 'arraybuffer',
      observe: 'response'
    } as any;
    return this.http.post<any>(`${environment.api}/protected/task/appointments/excel`, appointmentModel, options);
  }  

  insertSpecialService(taskId: number, movimentID: number, classifiersId: number[]) {
    return this.http.post<boolean>(`${environment.api}/protected/task/special`, this.osDetailFactory.convertToSaveSpecialService(taskId, movimentID, classifiersId));
  }
}