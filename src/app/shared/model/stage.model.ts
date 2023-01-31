import { Checklist } from './checklist.model';
import { Checkpoint } from './checkpoint.model';
import { ServiceOrderModel } from './serviceOrderModel';
import { InsertOrEditStageMovement, StageMovement } from './stage-movement.model';

export class Stage {
  public id: number;
  public name: string;
  public task: boolean;
  public special: boolean;
  public paymentByTeam: boolean;
  public statusJiraID: number;
  public checkpoint: Checkpoint;
  public checklist: Checklist;
  public value: number; 
  public moviments: StageMovement[];

  constructor() {
    this.moviments = [];
  }
}


export class InsertOrEditStage {
  public id: number;
  public name: string;
  public task: boolean;
  public special: boolean;
  public paymentByTeam: boolean;
  public statusJiraID: number;
  public checkpoint: number;
  public checklist: number;
  public value: number;
  public moviments: InsertOrEditStageMovement[];

  constructor() {
    
    this.moviments = [];
  }
}
