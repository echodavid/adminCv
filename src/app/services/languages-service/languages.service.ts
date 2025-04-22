import { Injectable } from "@angular/core";
import { Language } from "../../models/languages/language.model";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private dbPath = '/language';

  languagesRef: AngularFirestoreCollection<Language>;

  accesoLanguages = 'languages services running...';
  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
    this.languagesRef.doc("NjAg0kUL0cv6GmpbKlAf").delete();
  }
  getLanguages(): AngularFirestoreCollection<Language> {
    return this.languagesRef;
  }
  createLanguages(languages: Language): any {
    return this.languagesRef.add({ ...languages });
  }
  updateLanguages(id: string, data: Language): Promise<void> {
    return this.languagesRef.doc(id).update(data);
  }
  deleteLanguages(id: string): Promise<void> {
    console.log("deleting id", id);
    console.log("ref", this.languagesRef);
    console.log("deleting laguage", this.languagesRef.doc(id));
    return this.languagesRef.doc(id).delete();
  }
  
}
