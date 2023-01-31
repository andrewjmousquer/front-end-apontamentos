import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
  
import { environment } from '../../../environments/environment'; 
import { UsersTeam } from './../../page/team-form/users-team-form.model';
  
@Injectable({ providedIn: 'root' })
export class UsersTeamService {
   constructor(private http: HttpClient) { }

   getUsers() {
      return this.http.get<UsersTeam[]>(`${environment.api}/protected/user/list`);
    }
  }
