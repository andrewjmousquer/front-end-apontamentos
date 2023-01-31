import { Stage } from './stage.model';
import { UsersTeam } from './../../page/team-form/users-team-form.model';
export class Team {

    public id: number;
	public name: string;
	public abbreviation: string;	
    public users: UsersTeam[];
    public stages: Stage[];
}