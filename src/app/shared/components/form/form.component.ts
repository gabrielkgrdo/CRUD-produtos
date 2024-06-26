import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/products.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  product = input<Product | null>(null);

  route = inject(Router)

  form!: FormGroup;

  @Output() done = new EventEmitter<Product>()

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  onSubmit() {
    const product = this.form.value as Product
    this.done.emit(product)
  }

  voltar() {
    this.route.navigate(['']);
  }
}
