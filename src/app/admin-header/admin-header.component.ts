import { Component, OnInit } from '@angular/core';
import { Header } from '../models/header/header.model';
import { HeaderService } from '../services/header-service/header.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
  header: Header = {}; // Header object to hold the existing data
  headerId: string | undefined; // ID of the header document to update

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    // Load the existing header data
    this.headerService.getHeader().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.header = data[0]; // Assuming there's only one header entry
        this.headerId = data[0].id;
      }
    });
  }

  // Method to update the header
  updateHeader() {
    console.log('Updating header:', this.header);
    if (this.headerId) {
      this.headerService.updateHeader(this.headerId, this.header).then(() => {
        console.log('Header updated successfully');
      }).catch(error => {
        console.error('Error updating header:', error);
      });
    } else {
      console.error('Header ID is not defined');
    }
  }
}