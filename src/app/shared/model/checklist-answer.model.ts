import { ChecklistAnswerPhotoModel } from "./checklist-answer-photo.model";
import { ChecklistQuestion } from "./checklistQuestion.model";
import { Classifier } from "./classifier.model";
import { TaskModel } from "./task.model";


export class CheckListAnswerModel {

    public id: number;
    public creationDate: Date;
    public question: ChecklistQuestion;
    public comment: string;
    public task: TaskModel;
    public responsibleForAnswer;
    public answer: Classifier;
    public photos: ChecklistAnswerPhotoModel[];

    public blobImages: Blob;
    public fileName: string;

    constructor() {
        this.id = 0;
        this.task = new TaskModel();
        this.answer = new Classifier();
        this.photos = [];
    }
}

export class InsertEditCklAnswer {
    public id: number;
    public question: number;
    public comment: string;
    public task: number;
    public answer: number;
}