import { Injectable } from "@angular/core";
import { SearchAppointmentModel } from "src/app/shared/model/search-appointments.model";
import { TaskModel } from "src/app/shared/model/task.model";

@Injectable({ providedIn: 'root' })
export class ConsultOSFactory {

  constructor() { }

  public convertToSearch(task: TaskModel) {
    let toSearch = new SearchAppointmentModel();

    toSearch.numberOS = task.serviceOrder.number;
    toSearch.stage = task.stage.id

    return toSearch;
  }
}