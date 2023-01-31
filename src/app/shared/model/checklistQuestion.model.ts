import { CheckListAnswerModel } from "./checklist-answer.model";

export class ChecklistQuestion {

    public id?: number;
    public question?: string;
    public creationDate?: Date;
    public active?: number;
    public guid?: string;

    public cklId?: number;
    public answer?: CheckListAnswerModel;

}