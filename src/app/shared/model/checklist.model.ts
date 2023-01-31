import { ChecklistGroup } from "./checklistGroup.model";

export class Checklist {

  public id?: number;
  public name?: string;
  public descrition?: string;
  public priorityOrder?: string;
  public tag?: string;
  public groups?: ChecklistGroup[];
  public answered?: number;

}

