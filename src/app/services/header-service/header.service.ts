import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Header } from "../../models/header/header.model";


@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private dbPath = '/header';

  headerRef: AngularFirestoreCollection<Header>;

  accesoHeader = 'header service running...';

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getHeader(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }
  createHeader(header: Header): any {
    return this.headerRef.add({ ...header });
  }
  updateHeader(id: string, data: Header): Promise<void> {
    console.log("Updating header: ", data);
    console.log("Updating header id: ", id);
    console.log("Updating header data: ", this.headerRef);

    console.log("Updating header ref: ", this.headerRef.doc(id));
    return this.headerRef.doc(id).update(data);
  }
  deleteHeader(id: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }
}
