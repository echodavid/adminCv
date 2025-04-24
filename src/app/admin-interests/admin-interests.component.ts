import { Component, OnInit } from '@angular/core';
import { Interest } from '../models/interest/interset.model';
import { InterestsService } from '../services/interests-service/interests.service';

@Component({
  selector: 'app-admin-interests',
  standalone: false,
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent implements OnInit {
  interests: Interest[] = [];
  newInterest: Interest = { interest: '' };
  editingInterest: Interest | null = null; 

  constructor(private interestsService: InterestsService) {}

  ngOnInit(): void {
    this.interestsService.getInterests().subscribe(data => {
      this.interests = data;
    });
  }

  addInterest() {
    if (this.newInterest.interest?.trim()) {
      this.interestsService.createInterests(this.newInterest).then(() => {
        this.newInterest = { interest: '' };
      }).catch((error: any) => {
        console.error('Error adding interest:', error);
      });
    } else {
      console.error('The interest cannot be empty');
    }
  }

  deleteInterest(id: string | undefined) {
    if (!id) {
      console.error('Interest ID is undefined');
      return;
    }
    this.interestsService.deleteInterests(id).then(() => {
      console.log('Interest deleted successfully');
    }).catch(error => {
      console.error('Error deleting interest:', error);
    });
  }

  editInterest(interest: Interest) {
    this.editingInterest = { ...interest };
  }

  updateInterest() {
    if (this.editingInterest?.id) {
      this.interestsService.updateInterests(this.editingInterest.id, this.editingInterest)
        .then(() => {
          console.log('Interest updated successfully');
          this.editingInterest = null; 
        })
        .catch((error: any) => {
          console.error('Error updating interest:', error);
        });
    }
  }

  cancelEdit() {
    this.editingInterest = null;
  }
}