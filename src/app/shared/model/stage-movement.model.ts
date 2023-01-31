import { Classifier } from './classifier.model';
import { Contact } from './contact.model';

export class StageMovement {
  public id: number;
  public jiraID: number;
  public type: Classifier;
  public name: String;
  public icon: String;
}

export class InsertOrEditStageMovement {
  public id: number;
  public jiraID: number;
  public type: number;
  public name: String;
  public icon: String;

  constructor(id: number, JiraID: number, type: number, name: String, icon: String) {
    this.id = id;
    this.jiraID = JiraID;
    this.type = type;
    this.name = name;
    this.icon = icon;
  }
}

