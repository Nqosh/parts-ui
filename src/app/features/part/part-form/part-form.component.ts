import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule , Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
selector: 'app-part-form',
templateUrl: './part-form.component.html',
standalone: true,
imports:[
  CommonModule,
  FormsModule,
  ReactiveFormsModule
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
    form!: FormGroup;
    isEditMode: boolean = false;
    serverErrors: string[] = [];

    
    constructor(
      private fb:FormBuilder,
      private route: ActivatedRoute,
      public router: Router,
      private partService: PartService
    ) {}
    
    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    this.form = this.fb.group({
      partNumber: [{ value: '', disabled: this.isEditMode}, Validators.required],
      description: ['', Validators.required],
      quantityOnHand: [0, [Validators.required, Validators.min(0)]],
      locationCode: ['', Validators.required],
      lastStockTake: ['', Validators.required]
    });

    if (this.isEditMode && id) {
    this.isEdit = true;
    this.partService.get(id).subscribe({
      next: part => this.populateForm(part),
      error: () => this.router.navigate(['/'])
    });
    }
    }

    private populateForm (part:Part): void {
      this.form.patchValue({
        partNumber: part.partNumber,
        description: part.description,
        quantityOnHand: part.quantityOnHand,
        locationCode: part.locationCode,
        lastStockTake: this.formatDateOnly(part.lastStockTake)
      });
    }
    
    submit() {
    this.serverErrors = [];
    if(this.form.invalid) return;

    const formValue = this.form.getRawValue();
    const part: Part = {
      ...formValue,
      lastStockTake: this.formatDateOnly(formValue.lastStockTake)
    };

    if (this.isEdit) {
      debugger;
    this.partService.update(part).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => this.handleValidationErrors(err)
    });
    } else {
    this.partService.create(part).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => this.handleValidationErrors(err)
    });
    }
    }

    private formatDateOnly(input: string) {
      return new Date(input).toISOString().split('T')[0];
    }
    
    private handleValidationErrors(err: any) {
    if (err.status === 400 && err.error && typeof err.error === 'object') {
    const unknownArray: unknown[] = Object.values(err.error).flat();
    this.serverErrors = unknownArray as string[];;
    } else {
    this.serverErrors = ['Unexpected error'];
    }
    }
    }
