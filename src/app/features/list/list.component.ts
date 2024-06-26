import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from '../../shared/interfaces/products.interface';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);
  router = inject(Router);
  confirmDialogService = inject(ConfirmDialogService);

  productsService = inject(ProductsService);


  OnEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmDialogService
      .openDialog()
      .pipe(filter((resposta) => resposta === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products.set(products)
          });
        });
      });
  }
}
