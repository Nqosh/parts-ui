import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService } from '../../../../core/services/part.service';
import { Part } from '../../../../models/part.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-part-form',
templateUrl: './part-form.component.html',
standalone: true,
imports:[
  FormsModule,
  CommonModule
],
providers: [PartService]
})
export class PartFormComponent implements OnInit {
  part: Part = {
    partNumber: '',
    description: '',
    quantityOnHand: 0,
    locationCode: '',
    lastStockTake: new Date().toISOString()
    };
    
    isEdit = false;
    errorMessages: string[] = [];
    
    constructor(
    private route: ActivatedRoute,
    public router: Router,
    private partService: PartService
    ) {}
    
    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.isEdit = true;
    this.partService.get(id).subscribe(data => this.part = data);
    }
    }
    
    save() {
    this.errorMessages = [];
    
    if (this.isEdit) {
    this.partService.update(this.part).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => this.handleValidationErrors(err)
    });
    } else {
    this.partService.create(this.part).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => this.handleValidationErrors(err)
    });
    }
    }
    
    private handleValidationErrors(err: any) {
    if (err.status === 400 && err.error && typeof err.error === 'object') {
    const unknownArray: unknown[] = Object.values(err.error).flat();
    this.errorMessages = unknownArray as string[];;
    } else {
    this.errorMessages = ['Unexpected error'];
    }
    }
    }
