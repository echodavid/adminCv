import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
} from "@angular/fire/firestore";
import { initializeApp } from "@angular/fire/app";
import { BehaviorSubject, Observable } from "rxjs";
import { WorkExperience } from "../../models/work-experience/workExperience.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  private dbPath = '/work-experience';
  private firestore = getFirestore(
    initializeApp(environment.firebase)
  );
  private workExperienceSubject: BehaviorSubject<WorkExperience[]> = new BehaviorSubject<WorkExperience[]>([]);

  constructor() {
    this.listenToWorkExperience();
  }

  private listenToWorkExperience(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const workExperienceList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as WorkExperience));
      this.workExperienceSubject.next(workExperienceList);
    });
  }

  getWorkExperience(): Observable<WorkExperience[]> {
    return this.workExperienceSubject.asObservable();
  }

  async createWorkExperience(workExperience: WorkExperience): Promise<void> {
    delete workExperience.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...workExperience });
  }

  async updateWorkExperience(id: string, data: WorkExperience): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteWorkExperience(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}