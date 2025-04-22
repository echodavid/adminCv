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
import { Header } from "../../models/header/header.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private dbPath = '/header';
  private firestore = getFirestore(
    initializeApp(environment.firebase)
  );
  private headerSubject: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>([]);

  constructor() {
    this.listenToHeader();
  }

  private listenToHeader(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const headers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Header));
      this.headerSubject.next(headers);
    });
  }

  getHeader(): Observable<Header[]> {
    return this.headerSubject.asObservable();
  }

  async createHeader(header: Header): Promise<void> {
    delete header.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...header });
  }

  async updateHeader(id: string, data: Header): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteHeader(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}