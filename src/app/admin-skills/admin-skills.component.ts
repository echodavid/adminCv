import { Component } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  standalone: false,
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  skills: Skills[] = []; // Lista de habilidades
  newSkill: Skills = { skill: '', level: 0 }; // Nueva habilidad a agregar

  constructor(private skillsService: SkillsService) {
    // Cargar habilidades desde el servicio
    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.skills = data as Skills[];
    });
  }

  // Método para agregar una habilidad
  addSkill() {
    if (this.newSkill.skill?.trim() && this.newSkill.level !== undefined) {
      this.skillsService.createSkills(this.newSkill).then(() => {
        console.log('Habilidad agregada exitosamente');
        this.newSkill = { skill: '', level: 0 }; // Limpiar el formulario
      }).catch((error: any) => {
        console.error('Error al agregar la habilidad:', error);
      });
    } else {
      console.error('La habilidad o el nivel no pueden estar vacíos');
    }
  }

  // Método para eliminar una habilidad
  deleteSkill(id: string | undefined) {
    if (!id) {
      console.error('ID de la habilidad no definido');
      return;
    }
    this.skillsService.deleteSkills(id).then(() => {
      console.log('Habilidad eliminada exitosamente');
    }).catch(error => {
      console.error('Error al eliminar la habilidad:', error);
    });
  }
}