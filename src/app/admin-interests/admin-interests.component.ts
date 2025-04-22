import { Component } from '@angular/core';
import { Interest } from '../models/interest/interset.model';
import { InterestsService } from '../services/interests-service/interests.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  standalone: false,
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  interests: Interest[] = []; // Lista de intereses
  newInterest: Interest = { interest: '' }; // Nuevo interés a agregar

  constructor(private interestsService: InterestsService) {
    // Cargar intereses desde el servicio
    this.interestsService.getInterests().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.interests = data as Interest[];
    });
  }

  // Método para agregar un interés
  addInterest() {
    if (this.newInterest.interest?.trim()) {
      this.interestsService.createInterests(this.newInterest).then(() => {
        console.log('Interés agregado exitosamente');
        this.newInterest = { interest: '' }; // Limpiar el formulario
      }).catch((error: any) => {
        console.error('Error al agregar el interés:', error);
      });
    } else {
      console.error('El interés no puede estar vacío');
    }
  }

  // Método para eliminar un interés
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