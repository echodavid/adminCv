import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  private firestore: Firestore;
  private certificatesSubject: BehaviorSubject<Certificates[]> = new BehaviorSubject<Certificates[]>([]);

  constructor() {
    this.firestore = getFirestore();
    this.listenToCertificates();
  }

  private listenToCertificates(): void {
    const collectionRef = collection(this.firestore, '/certificates');
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
    const collectionRef = collection(this.firestore, '/certificates');
    await addDoc(collectionRef, { ...certificate });
  }

  async deleteCertificates(id: string): Promise<void> {
    const docRef = doc(this.firestore, `/certificates/${id}`);
    await deleteDoc(docRef);
  }
}