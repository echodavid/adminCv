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
import { initializeApp } from '@angular/fire/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from '../../models/languages/language.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private dbPath = '/language';
  private firestore = getFirestore(
    initializeApp(environment.firebase)
  );
  private languagesSubject: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);

  constructor() {
    this.listenToLanguages();
  }

  private listenToLanguages(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const languages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Language));
      this.languagesSubject.next(languages);
    });
  }

  getLanguages(): Observable<Language[]> {
    return this.languagesSubject.asObservable();
  }

  async createLanguages(language: Language): Promise<void> {
    delete language.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...language });
  }

  async updateLanguages(id: string, data: Language): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteLanguages(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}