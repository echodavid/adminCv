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
  editingSkill: Skills | null = null; 

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
        console.error('Error adding skill:', error);
      });
    } else {
      console.error('The skill or level cannot be empty');
    }
  }

  deleteSkill(id: string | undefined) {
    if (!id) {
      console.error('Skill ID is undefined');
      return;
    }
    this.skillsService.deleteSkills(id).then(() => {
      console.log('Skill deleted successfully');
    }).catch(error => {
      console.error('Error deleting skill:', error);
    });
  }

  editSkill(skill: Skills) {
    this.editingSkill = { ...skill };
  }

  updateSkill() {
    if (this.editingSkill?.id) {
      this.skillsService.updateSkills(this.editingSkill.id, this.editingSkill)
        .then(() => {
          console.log('Skill updated successfully');
          this.editingSkill = null; 
        })
        .catch((error: any) => {
          console.error('Error updating skill:', error);
        });
    }
  }

  cancelEdit() {
    this.editingSkill = null;
  }
}