import { Component, EventEmitter, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/products.interface';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>()

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onEdit() {
  this.edit.emit();
  }

  onDelete() {
  this.delete.emit();
  }
}
