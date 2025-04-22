import { Component, NgZone } from '@angular/core';
import { Language } from '../models/languages/language.model';
import { LanguagesService } from '../services/languages-service/languages.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  standalone: false,
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  languages: Language[] = []; // Lista de idiomas
  newLanguage: Language = { language: '' }; // Nuevo idioma a agregar

  constructor(private languagesService: LanguagesService,private ngZone: NgZone) {
    // Cargar idiomas desde el servicio
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.languages = data as Language[];
      console.log('Idiomas cargados:', this.languages);
    });

  }

  // Método para agregar un idioma
  addLanguage() {
    if (this.newLanguage.language?.trim()) {
      this.languagesService.createLanguages(this.newLanguage).then(() => {
        console.log('Idioma agregado exitosamente');
        this.newLanguage = { language: '' }; // Limpiar el formulario
      }).catch((error: any) => {
        console.error('Error al agregar el idioma:', error);
      });
    } else {
      console.error('El idioma no puede estar vacío');
    }
  }

  // Método para eliminar un idioma
  deleteLanguage(id: string | undefined) {
    console.log("asdasd")
    if (!id) {
      console.error('ID del idioma no definido');
      return;
    }
    this.languagesService.deleteLanguages(id).then(() => {
      this.ngZone.run(() => {
        console.log('Idioma eliminado exitosamente');
        this.languages = this.languages.filter(language => language.id !== id); // Update the list
      });
      //this.languages = this.languages.filter(language => language.id !== id);
      console.log('Idioma eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar el idioma:', error);
    });
  }
}