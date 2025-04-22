import { Component } from '@angular/core';
import { Certificates } from '../models/certificates/certificates.model';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  standalone: false,
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
  certificatesList: Certificates[] = []; // Lista de certificados
  newCertificate: Certificates = { name: '', institution: '', date: '', description: '' }; // Nuevo certificado

  constructor(private certificatesService: CertificatesService) {
    // Cargar certificados desde el servicio
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.certificatesList = data as Certificates[];
    });
  }

  // Método para agregar un certificado
  addCertificate() {
    if (this.newCertificate.name?.trim() && this.newCertificate.institution?.trim()) {
      this.certificatesService.createCertificates(this.newCertificate).then(() => {
        console.log('Certificado agregado exitosamente');
        this.newCertificate = { name: '', institution: '', date: '', description: '' }; // Limpiar el formulario
      }).catch((error:any) => {
        console.error('Error al agregar el certificado:', error);
      });
    } else {
      console.error('El nombre y la institución no pueden estar vacíos');
    }
  }

  // Método para eliminar un certificado
  deleteCertificate(id: string | undefined) {
    if (!id) {
      console.error('ID del certificado no definido');
      return;
    }
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('Certificado eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar el certificado:', error);
    });
  }
}