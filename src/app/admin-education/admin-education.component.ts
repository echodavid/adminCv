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
  itemCount: number = 0;
  educationList: Education[] = [];
  newEducation: Education = { degree: '', institution: '', startDate: '', endDate: '' };

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
      this.itemCount = this.educationList.length;
    });
  }

  addEducation() {
    this.educationService.createEducation(this.newEducation).then(() => {
      this.newEducation = { degree: '', institution: '', startDate: '', endDate: '' };
    }).catch((error: any) => {
      console.error('Error adding Education record:', error);
    });
  }

  deleteEducation(id: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('Education record deleted successfully!');
    }).catch((error: any) => {
      console.error('Error deleting Education record:', error);
    });
  }
}