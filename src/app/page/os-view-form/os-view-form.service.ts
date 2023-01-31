import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OSViewFormFactory } from './os-view-form.factory';
import { Stage } from 'src/app/shared/model/stage.model';
import { ServiceOrderModel } from 'src/app/shared/model/service-order.model';

@Injectable({ providedIn: 'root' })
export class OSViewFormService {

  constructor(private http: HttpClient, private factory: OSViewFormFactory) { }

  getAll() {
    return this.http.get<ServiceOrderModel[]>(`${environment.api}/protected/service-order/listAll`);
  }

  search(model: ServiceOrderModel) {
    return this.http.post<ServiceOrderModel[]>(`${environment.api}/protected/service-order/search`, model);
  }

}
