import { Component, OnInit } from '@angular/core';
import { Header } from '../models/header/header.model';
import { HeaderService } from '../services/header-service/header.service';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  header: Header = {};
  headerId: string | undefined;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.getHeader().subscribe(data => {
      if (data.length > 0) {
        this.header = data[0];
        this.headerId = data[0].id;
      }
    });
  }

  updateHeader() {
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