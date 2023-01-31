import { ServiceOrderModel } from './service-order.model';
import { TaskWithTimeModel } from './task-with-time.model';


export class ServiceOrderDashboardModel {

  public serviceOrder: ServiceOrderModel;
  public tasks: TaskWithTimeModel[];

  constructor() {
    this.serviceOrder = new ServiceOrderModel();
    this.tasks = [];
  }
}

