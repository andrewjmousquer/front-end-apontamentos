import { Injectable } from '@angular/core';
import { InsertOrEditStageMovement } from 'src/app/shared/model/stage-movement.model';
import { InsertOrEditStage, Stage } from 'src/app/shared/model/stage.model';


@Injectable({ providedIn: 'root' })
export class OSViewFormFactory {

  constructor() { }

  public convertToInsert(stage: Stage) {
    let toReturn = new InsertOrEditStage();

    toReturn.id = stage.id != null && stage.id != undefined ? stage.id : 0;
    toReturn.name = stage.name;
    toReturn.task = stage.task;
    toReturn.special = stage.special;
    toReturn.statusJiraID = stage.statusJiraID;
    toReturn.checkpoint = stage.checkpoint != null && stage.checkpoint != undefined ? stage.checkpoint.id : 0;
    toReturn.checklist = stage.checklist.id;
    toReturn.moviments = [];

    if (stage.moviments != undefined && stage.moviments.length > 0)
      stage.moviments.forEach(e => { toReturn.moviments.push(new InsertOrEditStageMovement(e.id, e.jiraID, e.type.id, e.name, e.icon)) });

    return toReturn;

  }
}
