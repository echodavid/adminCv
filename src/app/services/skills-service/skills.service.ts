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
import { Skills } from "../../models/skills/skills.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private dbPath = '/skills';
  private firestore = getFirestore(
    initializeApp(environment.firebase)
  );
  private skillsSubject: BehaviorSubject<Skills[]> = new BehaviorSubject<Skills[]>([]);

  constructor() {
    this.listenToSkills();
  }

  private listenToSkills(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const skills = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Skills));
      this.skillsSubject.next(skills);
    });
  }

  getSkills(): Observable<Skills[]> {
    return this.skillsSubject.asObservable();
  }

  async createSkills(skills: Skills): Promise<void> {
    delete skills.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...skills });
  }

  async updateSkills(id: string, data: Skills): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteSkills(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}