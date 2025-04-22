import { Component, OnInit } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';

@Component({
  selector: 'app-admin-education',
  standalone: false,
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent implements OnInit {
  educationList: Education[] = [];
  newEducation: Education = { degree: '', institution: '', startDate: '', endDate: '' };

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
    });
  }

  addEducation() {
    if (this.newEducation.degree?.trim() && this.newEducation.institution?.trim()) {
      this.educationService.createEducation(this.newEducation).then(() => {
        this.newEducation = { degree: '', institution: '', startDate: '', endDate: '' };
      }).catch((error: any) => {
        console.error('Error al agregar el registro educativo:', error);
      });
    } else {
      console.error('El título y la institución no pueden estar vacíos');
    }
  }

  deleteEducation(id: string | undefined) {
    if (!id) {
      console.error('ID del registro educativo no definido');
      return;
    }
    this.educationService.deleteEducation(id).then(() => {
      console.log('Registro educativo eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar el registro educativo:', error);
    });
  }
}