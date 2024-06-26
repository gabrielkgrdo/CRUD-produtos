import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar Produto</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar esse produto?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="accent" (click)="onYes()">Sim</button>
      <button mat-button (click)="onNo()">Não</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onYes() {
    this.matDialogRef.close(true);
  }

  onNo() {
    this.matDialogRef.close(false);
  }
}
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: Product[] = [];
  router = inject(Router);
  matDialog = inject(MatDialog);

  productsService = inject(ProductsService);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  OnEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((resposta) => resposta === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {});
        this.productsService.getAll().subscribe((products) => {
          this.products = products;
        });
      });
  }
}
