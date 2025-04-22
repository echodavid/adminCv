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
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  private dbPath = '/certificates';
  private firestore = getFirestore();
  private certificatesSubject: BehaviorSubject<Certificates[]> = new BehaviorSubject<Certificates[]>([]);

  constructor() {
    this.listenToCertificates();
  }

  private listenToCertificates(): void {
    const collectionRef = collection(this.firestore, this.dbPath);
    onSnapshot(collectionRef, (snapshot) => {
      const certificates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Certificates));
      this.certificatesSubject.next(certificates);
    });
  }

  getCertificates(): Observable<Certificates[]> {
    return this.certificatesSubject.asObservable();
  }

  async createCertificates(certificate: Certificates): Promise<void> {
    delete certificate.id;
    const collectionRef = collection(this.firestore, this.dbPath);
    await addDoc(collectionRef, { ...certificate });
  }

  async updateCertificates(id: string, data: Certificates): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteCertificates(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    await deleteDoc(docRef);
  }
}