import { Classifier } from './classifier.model';
import { ServiceOrderModel } from './service-order.model';
import { Stage } from './stage.model';

export class TaskWithTimeModel {

  public id: number;
  public name: string;
  public dateStart: Date;
  public dateFinish: Date;
  public status: Classifier;
  public stage: Stage;
  public serviceOrder: ServiceOrderModel;
  public totalTime: string;
  public checklistFile: string



  constructor() {

  }
}

