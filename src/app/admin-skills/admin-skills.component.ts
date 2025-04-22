import { Component, OnInit } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';

@Component({
  selector: 'app-admin-skills',
  standalone: false,
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent implements OnInit {
  skills: Skills[] = [];
  newSkill: Skills = { skill: '', level: 0 };

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

  addSkill() {
    if (this.newSkill.skill?.trim() && this.newSkill.level !== undefined) {
      this.skillsService.createSkills(this.newSkill).then(() => {
        this.newSkill = { skill: '', level: 0 };
      }).catch((error: any) => {
        console.error('Error al agregar la habilidad:', error);
      });
    } else {
      console.error('La habilidad o el nivel no pueden estar vacíos');
    }
  }

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