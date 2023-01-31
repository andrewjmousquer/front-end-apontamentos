import { Classifier } from "./classifier.model";
import { TaskModel } from "./task.model";

export class TaskUserModel {

	public id: number;
	public task: TaskModel;
	public user: number;
	public name: string;
	public status: Classifier;
	public dateStart: Date;
	public dateFinish: Date;

}
