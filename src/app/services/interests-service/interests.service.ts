import { Injectable } from "@angular/core";
import { Interest } from "../../models/interest/interset.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class InterestsService{

  private dbPath = '/interest';

  interestRef: AngularFirestoreCollection<Interest>;

  accesoInterests = "interests services running...";
  constructor(private db: AngularFirestore){
    this.interestRef = db.collection(this.dbPath);
  }
  getInterests(): AngularFirestoreCollection<Interest> {
    return this.interestRef;
  }
  createInterests(interests: Interest): any {
    return this.interestRef.add({ ...interests });
  }
  updateInterests(id: string, data: Interest): Promise<void> {
    return this.interestRef.doc(id).update(data);
  }
  deleteInterests(id: string): Promise<void> {
    return this.interestRef.doc(id).delete();
  }
  
}
