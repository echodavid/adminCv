import { Component, OnInit } from '@angular/core';
import { Language } from '../models/languages/language.model';
import { LanguagesService } from '../services/languages-service/languages.service';

@Component({
  selector: 'app-admin-languages',
  standalone: false,
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent implements OnInit {
  languages: Language[] = [];
  newLanguage: Language = { language: '' };

  constructor(private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languagesService.getLanguages().subscribe(data => {
      this.languages = data;
    });
  }

  addLanguage() {
    if (this.newLanguage.language?.trim()) {
      this.languagesService.createLanguages(this.newLanguage).then(() => {
        this.newLanguage = { language: '' };
      }).catch((error: any) => {
        console.error('Error al agregar el idioma:', error);
      });
    } else {
      console.error('El idioma no puede estar vacío');
    }
  }

  deleteLanguage(id: string | undefined) {
    if (!id) {
      console.error('ID del idioma no definido');
      return;
    }
    this.languagesService.deleteLanguages(id).then(() => {
      console.log('Idioma eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar el idioma:', error);
    });
  }
}