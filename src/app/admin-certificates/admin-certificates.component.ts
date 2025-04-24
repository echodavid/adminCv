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
  itemCount: number = 0;
  certificatesList: Certificates[] = [];
  newCertificate: Certificates = { name: '', institution: '', date: '', description: '' };

  constructor(private certificatesService: CertificatesService) {}

  ngOnInit(): void {
    this.certificatesService.getCertificates().subscribe(data => {
      this.certificatesList = data;
      this.itemCount = this.certificatesList.length;
    });
  }

  addCertificate() {
    if (this.newCertificate.name?.trim() && this.newCertificate.institution?.trim()) {
      this.certificatesService.createCertificates(this.newCertificate).then(() => {
        console.log('Certificate added successfully');
        this.newCertificate = { name: '', institution: '', date: '', description: '' };
        this.itemCount = this.certificatesList.length;
      }).catch((error: any) => {
        console.error('Error adding certificate:', error);
      });
    } else {
      console.error('The name and institution cannot be empty');
    }
  }

  deleteCertificate(id: string) {
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('Certificate deleted successfully');
      this.itemCount = this.certificatesList.length;
    }).catch(error => {
      console.error('Error deleting certificate:', error);
    });
  }
}