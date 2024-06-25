import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  productService = inject(ProductsService)

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
  })

  onSubmit() {
    this.productService.post({
      title: this.form.controls.title.value
    })
    .subscribe(() => {
      alert('Sucesso')
    })
  }

}
