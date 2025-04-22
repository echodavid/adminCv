import { Injectable } from "@angular/core";
import { Education } from "../../models/education/education.model";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class EducationService{


  private dbPath = '/education';

  educationRef: AngularFirestoreCollection<Education>;

  accesoEducation = "education services running...";
  constructor(private db: AngularFirestore) {
      this.educationRef = db.collection(this.dbPath);
    }

  getEducation(): AngularFirestoreCollection<Education> {
    return this.educationRef;
  }
  createEducation(education: Education): any {
    return this.educationRef.add({ ...education });
  }
  updateEducation(id: string, data: Education): Promise<void> {
    return this.educationRef.doc(id).update(data);
  }
  deleteEducation(id: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }
  
}
