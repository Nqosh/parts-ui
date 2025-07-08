import { Component, OnInit } from '@angular/core';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-list',
  standalone: true,
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css'],
  imports:[
    CommonModule
  ],
  providers: [PartService]
})
export class PartListComponent implements OnInit {
  parts: Part[] = [];

  constructor(public partService: PartService, public router: Router) {}

  ngOnInit() {
    this.loadParts();
  }


  loadParts() {

    this.partService.getAll().subscribe({
      next: response => {
        this.parts = response;
      },
      error: error => console.log(error)
    })

    //this.partService.getAll().subscribe(data => this.parts = data);
    }

    delete(partNumber: string) {
      if (confirm('Are you sure?')) {
      this.partService.delete(partNumber).subscribe(() => this.loadParts());
      }
      }
}
