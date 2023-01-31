import { TeamFormFactory } from './team-form.factory';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Team } from "./../../shared/model/team.model";

@Injectable({
  providedIn: "root",
})
export class TeamFormService {
  constructor(private http: HttpClient,
    private teamFormFactory: TeamFormFactory) {}

  getAll() {
    return this.http.get<Team[]>(`${environment.api}/protected/team/list`);
  }

  getById(id: number) {
    return this.http.get<Team>(`${environment.api}/protected/team/${id}`
    );
  }

  search(model: Team) {
    return this.http.post<Team[]>(`${environment.api}/protected/team/search`, model);
  }

  saveOrUpdate(model: Team) {
    return this.http.post<Team>(`${environment.api}/protected/team/`,this.teamFormFactory.convertToInsert(model)
    );
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.api}/protected/team/${id}`);
  }
}
