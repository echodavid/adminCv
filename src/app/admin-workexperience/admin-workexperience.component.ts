import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../models/work-experience/workExperience.model';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';

@Component({
  selector: 'app-admin-workexperience',
  standalone: false,
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent implements OnInit {
  itemCount: number = 0;
  workExperience: WorkExperience[] = [];
  newWorkExperience: WorkExperience = new WorkExperience();
  editingWorkExperience: WorkExperience | null = null; 

  constructor(public workExperienceService: WorkExperienceService) {}

  ngOnInit(): void {
    this.workExperienceService.getWorkExperience().subscribe(data => {
      this.workExperience = data;
      this.itemCount = this.workExperience.length;
    });
  }

  addWorkExperience() {
    this.workExperienceService.createWorkExperience(this.newWorkExperience).then(() => {
      this.newWorkExperience = new WorkExperience();
    }).catch((error: any) => {
      console.error("Error adding Work Experience: ", error);
    });
  }

  deleteWorkExperience(id: string) {
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log("Work Experience deleted successfully!");
    }).catch((error: any) => {
      console.error("Error deleting Work Experience: ", error);
    });
  }

  editWorkExperience(job: WorkExperience) {
    this.editingWorkExperience = { ...job }; 
  }

  updateWorkExperience() {
    if (this.editingWorkExperience?.id) {
      this.workExperienceService.updateWorkExperience(this.editingWorkExperience.id, this.editingWorkExperience)
        .then(() => {
          console.log("Work Experience updated successfully!");
          this.editingWorkExperience = null; 
        })
        .catch((error: any) => {
          console.error("Error updating Work Experience: ", error);
        });
    }
  }

  cancelEdit() {
    this.editingWorkExperience = null;
  }
}