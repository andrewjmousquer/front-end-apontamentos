import { ChecklistQuestion } from "./checklistQuestion.model";


export class ChecklistGroup {

    public ckgId?: number;
    public name?: String;
    public questions?: ChecklistQuestion[];
    public guid?: string;

    public answered?: number;

}