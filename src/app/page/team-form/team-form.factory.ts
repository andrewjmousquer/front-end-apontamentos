import { Injectable } from "@angular/core";
import { Team } from "./../../shared/model/team.model";
import { InsertEditTeam } from "src/app/shared/model/insert-edit-team.model";
@Injectable({ providedIn: "root" })
export class TeamFormFactory {
  constructor() {}

  public convertToInsert(team: Team) {
    let toReturn = new InsertEditTeam();
    toReturn.name = team.name;
    toReturn.id = team.id != undefined && team.id != null ? team.id : 0;
    toReturn.abbreviation = team.abbreviation;
    toReturn.users = [];
    toReturn.stages = []

    if (team.users != undefined && team.users.length > 0) {
      team.users.forEach((e) => {
        toReturn.users.push(e.id);
      });
    }
    if (team.stages != undefined && team.stages.length > 0) {
      team.stages.forEach((e) => {
        toReturn.stages.push(e.id);
      });
    }
    
    return toReturn;
  }
}
