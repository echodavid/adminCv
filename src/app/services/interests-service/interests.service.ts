import { Injectable } from "@angular/core";
import { Interest } from "../../models/interest/interset.model";
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
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  private dbPath = '/interest';
  private firestore = getFirestore(
    initializeApp(environment.firebase)
  );
  private interestsSubject: BehaviorSubject<Interest[]> = new BehaviorSubject<Interest[]>([]);

  constructor() {
    this.listenToInterests();
  }

  private listenToInterests(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const interests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Interest));
      this.interestsSubject.next(interests);
    });
  }

  getInterests(): Observable<Interest[]> {
    return this.interestsSubject.asObservable();
  }

  async createInterests(interests: Interest): Promise<void> {
    delete interests.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...interests });
  }

  async updateInterests(id: string, data: Interest): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteInterests(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}