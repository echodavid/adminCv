import { Component } from '@angular/core';
import { WorkExperience } from '../models/work-experience/workExperience.model';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-workexperience',
  standalone: false,
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {

  itemCount: number = 0;
  btntxt: string = "Add Work Experience";
  goalText: string = "";
  workExperience: WorkExperience[] = []
  newWorkExperience: WorkExperience = new WorkExperience()

  constructor(public workExperienceService: WorkExperienceService){
    console.log("asd" ,this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map((changes: any[]) => 
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.workExperience = data as WorkExperience[];
      this.itemCount = this.workExperience.length;
      console.log("Work Experience: ", this.workExperience);
    })
  }

  addWorkExperience() {
    this.workExperienceService.createWorkExperience(this.newWorkExperience).then(() => {
      console.log("Work Experience added successfully!");
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


}
