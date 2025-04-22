import { Injectable } from "@angular/core";
import { WorkExperience } from "../../models/work-experience/workExperience.model";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class WorkExperienceService{

  private dbPath = '/work-experience';

  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  accesoWorkExperience = "work esperience service running...";
  constructor(private db: AngularFirestore){
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }
  createWorkExperience(workExperience: WorkExperience): any {
    delete(workExperience.id)
    console.log("Creating work experience: ", workExperience);
    return this.workExperienceRef.add({ ...workExperience });
  }
  updateWorkExperience(id: string, data: WorkExperience): Promise<void> {
    return this.workExperienceRef.doc(id).update(data);
  }
  deleteWorkExperience(id: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }
}
