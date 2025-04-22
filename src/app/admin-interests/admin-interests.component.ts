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
        console.error('Error al agregar el interés:', error);
      });
    } else {
      console.error('El interés no puede estar vacío');
    }
  }

  deleteInterest(id: string | undefined) {
    if (!id) {
      console.error('ID del interés no definido');
      return;
    }
    this.interestsService.deleteInterests(id).then(() => {
      console.log('Interés eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar el interés:', error);
    });
  }
}