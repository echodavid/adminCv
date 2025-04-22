import { Injectable } from "@angular/core";
import { Certificates } from "../../models/certificates/certificates.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService{

  private dbPath = '/certificates';

  certificatesRef: AngularFirestoreCollection<Certificates>;

  accesoCertificates = "certificates service running...";

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<Certificates> {
    return this.certificatesRef;
  }
  createCertificates(certificates: Certificates): any {
    return this.certificatesRef.add({ ...certificates });
  }
  updateCertificates(id: string, data: Certificates): Promise<void> {
    return this.certificatesRef.doc(id).update(data);
  }
  deleteCertificates(id: string): Promise<void> {
    return this.certificatesRef.doc(id).delete();
  }
}
