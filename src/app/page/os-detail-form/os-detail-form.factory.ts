import { Injectable } from '@angular/core';
import { AppointmentModel } from 'src/app/shared/model/appointment.Model';
import { InsertOrEditSpecialServiceModel } from 'src/app/shared/model/insert-or-edit-special-service.model';
import { InsertOrEditTaskUserTimeModel } from 'src/app/shared/model/insert-or-edit-task-user-time.model';
import { SearchAppointmentModel } from 'src/app/shared/model/search-appointments.model';
import { InsertOrEditStageMovement } from 'src/app/shared/model/stage-movement.model';
import { InsertOrEditStage, Stage } from 'src/app/shared/model/stage.model';
import { TaskWithTimeModel } from 'src/app/shared/model/task-with-time.model';


@Injectable({ providedIn: 'root' })
export class OSDetailFormFactory {

  constructor() { }

  public convertToSearch(task: TaskWithTimeModel) {
    let toSearch = new SearchAppointmentModel();

    toSearch.numberOS = task.serviceOrder.number;
    toSearch.stage = task.stage.id

    return toSearch;
  }

  public convertToSave(task: AppointmentModel, dateStart: Date, dateFinish: Date) {
    let toSave = new InsertOrEditTaskUserTimeModel();

    toSave.id = task.idRegisterTime;
    toSave.dateStart = dateStart;
    toSave.dateFinish = dateFinish;
    toSave.taskUser = task.idRegisterTime;

    return toSave;

  }

  public convertToSaveSpecialService(taskId: number, movimentID: number, classifiersId: number[]) {
    let toSave = new InsertOrEditSpecialServiceModel();

    toSave.taskID = taskId;
    toSave.movementID = movimentID;
    toSave.classifiersId = classifiersId;

    return toSave;
  }
}
