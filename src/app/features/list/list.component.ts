import { Product } from './../../shared/interfaces/products.interface';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  );
  router = inject(Router);
  confirmDialogService = inject(ConfirmDialogService);

  productsService = inject(ProductsService);
  snackBar = inject(MatSnackBar)

  OnEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmDialogService
      .openDialog(product)
      .pipe(filter((resposta) => resposta === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.snackBar.open('Produto deletado com sucesso!', 'OK', {});
            this.products.set(products);
          });
        });
      });
  }
}
