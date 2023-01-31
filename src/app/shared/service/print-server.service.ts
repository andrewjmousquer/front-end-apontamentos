import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { AccessList } from "../model/access-list.model";

@Injectable({ providedIn: "root" })
export class PrinterService {
  constructor(private http: HttpClient) {}

  print(body: any) {
    return this.http.post<boolean>(`${environment.printerApi}/print/`, body);
  }
}
