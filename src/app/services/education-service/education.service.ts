import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private dbPath = '/education';
  private firestore = getFirestore();
  private educationSubject: BehaviorSubject<Education[]> = new BehaviorSubject<Education[]>([]);

  constructor() {
    this.listenToEducation();
  }

   private listenToEducation(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const educationList = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      } as Education));
      this.educationSubject.next(educationList);
    });
  }

  getEducation(): Observable<Education[]> {
    return this.educationSubject.asObservable();
  }

  async createEducation(education: Education): Promise<void> {
    delete education.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...education });
  }

  async updateEducation(id: string, data: Education): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteEducation(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}