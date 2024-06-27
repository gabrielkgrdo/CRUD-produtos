import { Component, Injectable, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../interfaces/products.interface';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar {{ product.title}}?</h2>
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
  data = inject(MAT_DIALOG_DATA);
  product: Product = this.data.product;

  onYes() {
    this.matDialogRef.close(true);
  }

  onNo() {
    this.matDialogRef.close(false);
  }
}
@Injectable({
  providedIn: 'root',
})

export class ConfirmDialogService {
  matDialog = inject(MatDialog);


  constructor() {}

  openDialog(product: Product): Observable<boolean>{
    return this.matDialog.open(ConfirmationDialogComponent, {
      data: { product }
    }).afterClosed();
  }
}
