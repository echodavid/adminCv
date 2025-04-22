import { Component, OnInit } from '@angular/core';
import { Certificates } from '../models/certificates/certificates.model';
import { CertificatesService } from '../services/certificates-service/certificates.service';

@Component({
  selector: 'app-admin-certificates',
  standalone: false,
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent implements OnInit {
  certificatesList: Certificates[] = [];
  newCertificate: Certificates = { name: '', institution: '', date: '', description: '' };

  constructor(private certificatesService: CertificatesService) {}

  ngOnInit(): void {
    this.certificatesService.getCertificates().subscribe(data => {
      this.certificatesList = data;
    });
  }

  addCertificate() {
    if (this.newCertificate.name?.trim() && this.newCertificate.institution?.trim()) {
      this.certificatesService.createCertificates(this.newCertificate).then(() => {
        console.log('Certificado agregado exitosamente');
        this.newCertificate = { name: '', institution: '', date: '', description: '' };
      }).catch((error: any) => {
        console.error('Error al agregar el certificado:', error);
      });
    } else {
      console.error('El nombre y la institución no pueden estar vacíos');
    }
  }

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