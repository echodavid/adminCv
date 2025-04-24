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
  editingLanguage: Language | null = null;

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
        console.error('Error adding language:', error);
      });
    } else {
      console.error('The language cannot be empty');
    }
  }

  deleteLanguage(id: string | undefined) {
    if (!id) {
      console.error('Language ID is undefined');
      return;
    }
    this.languagesService.deleteLanguages(id).then(() => {
      console.log('Language deleted successfully');
    }).catch(error => {
      console.error('Error deleting language:', error);
    });
  }

  editLanguage(language: Language) {
    this.editingLanguage = { ...language }; 
  }

  updateLanguage() {
    if (this.editingLanguage?.id) {
      this.languagesService.updateLanguages(this.editingLanguage.id, this.editingLanguage)
        .then(() => {
          console.log('Language updated successfully');
          this.editingLanguage = null; 
        })
        .catch((error: any) => {
          console.error('Error updating language:', error);
        });
    }
  }

  cancelEdit() {
    this.editingLanguage = null; 
  }
}