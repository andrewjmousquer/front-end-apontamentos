import { Classifier } from './classifier.model';

export class ServiceOrderModel {
  public id: number;
  public numberJira: number;
  public dateStart: Date;
  public dateFinish: Date;
  public statusOs: number;
  public brand: string;
  public model: string;
  public plate: string;
  public chassi: string;
  public number: string;
  public value: number;
}