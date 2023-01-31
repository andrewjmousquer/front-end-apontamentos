import { Stage } from "./stage.model";

import { Classifier } from "./classifier.model";
import { ServiceOrderModel } from "./serviceOrderModel";


export class TaskModel {
  public id: number;
  public name: string;
  public numberJira: string;
  public status: Classifier;
  public dateStart: Date;
  public dateFinish: Date;
  public serviceOrder: ServiceOrderModel;
  public stage: Stage;
  public totalTime: string;
  public checkListFile: string;
  public place: string;
}