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
  editingEducation: Education | null = null; 

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
      this.itemCount = this.educationList.length;
    });
  }

  addEducation() {
    if (this.newEducation.degree?.trim() && this.newEducation.institution?.trim()) {
      this.educationService.createEducation(this.newEducation).then(() => {
        this.newEducation = { degree: '', institution: '', startDate: '', endDate: '' };
      }).catch((error: any) => {
        console.error('Error adding Education record:', error);
      });
    } else {
      console.error('The degree and institution cannot be empty');
    }
  }

  deleteEducation(id: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('Education record deleted successfully!');
    }).catch((error: any) => {
      console.error('Error deleting Education record:', error);
    });
  }

  editEducation(education: Education) {
    this.editingEducation = { ...education }; 
  }

  updateEducation() {
    if (this.editingEducation?.id) {
      this.educationService.updateEducation(this.editingEducation.id, this.editingEducation)
        .then(() => {
          console.log('Education record updated successfully!');
          this.editingEducation = null;
        })
        .catch((error: any) => {
          console.error('Error updating Education record:', error);
        });
    }
  }

  cancelEdit() {
    this.editingEducation = null; 
  }
}