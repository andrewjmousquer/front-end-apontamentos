import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CheckListFactory } from "src/app/page/fill-checklist-form/fill-checklist-form-factory";
import { environment } from "src/environments/environment";
import { CheckListAnswerModel } from "../model/checklist-answer.model";


@Injectable({ providedIn: "root" })
export class CheckListAnswerService {

    constructor(private http: HttpClient,
        private cklFactory: CheckListFactory) { }
        
        saveOrUpdate(model, images: Blob, fileName: string) {

            const formData: FormData = new FormData();    
            formData.append('dto', new Blob([JSON.stringify(this.cklFactory.convertToInsert(model))], { type: "application/json" }));

            if (images != null) {
                formData.append('file', images, fileName);
            }    
    
            return this.http.post(`${environment.api}/protected/checklist-answer/save-upload`, formData);
        }
    
        getById(id: number) {
            return this.http.get<CheckListAnswerModel>(`${environment.api}/protected/checklist-answer/${id}`)
        }


}