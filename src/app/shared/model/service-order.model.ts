import { Classifier } from './classifier.model';

export class ServiceOrderModel {

  public id: number;
  public numberJira: string;
  public dateStart: Date;
  public dateFinish: Date;
  public statusOs: Classifier;
  public brand: string;
  public model: string;
  public plate: string;
  public chassi: string;
  public number: string;

  constructor() {

  }
}

