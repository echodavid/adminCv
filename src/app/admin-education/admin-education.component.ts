import { Component } from '@angular/core';
import { Education } from '../models/education/education.model';
import { EducationService } from '../services/education-service/education.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  standalone: false,
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  educationList: Education[] = []; // Lista de registros educativos
  newEducation: Education = { degree: '', institution: '', startDate: '', endDate: '' }; // Nuevo registro educativo

  constructor(private educationService: EducationService) {
    // Cargar registros educativos desde el servicio
    this.educationService.getEducation().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.educationList = data as Education[];
    });
  }

  // Método para agregar un registro educativo
  addEducation() {
    if (this.newEducation.degree?.trim() && this.newEducation.institution?.trim()) {
      this.educationService.createEducation(this.newEducation).then(() => {
        console.log('Registro educativo agregado exitosamente');
        this.newEducation = { degree: '', institution: '', startDate: '', endDate: '' }; // Limpiar el formulario
      }).catch((error:any) => {
        console.error('Error al agregar el registro educativo:', error);
      });
    } else {
      console.error('El título y la institución no pueden estar vacíos');
    }
  }

  // Método para eliminar un registro educativo
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