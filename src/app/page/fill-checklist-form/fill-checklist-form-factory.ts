import { Injectable } from "@angular/core";
import { InsertEditCklAnswer } from "src/app/shared/model/checklist-answer.model";


@Injectable({ providedIn: "root" })
export class CheckListFactory {
    constructor() { }

    public convertToInsert(modelAnswer) {
        let toReturn = new InsertEditCklAnswer();

        toReturn.id = modelAnswer.id != undefined && modelAnswer.id !== null ? modelAnswer.id : 0;
        toReturn.question = modelAnswer.question.id
        toReturn.comment = modelAnswer.comment != undefined && modelAnswer.comment !== null ? modelAnswer.comment : null;
        toReturn.task = modelAnswer.task;
        toReturn.answer = modelAnswer.answer.id;

        return toReturn;
    }

}