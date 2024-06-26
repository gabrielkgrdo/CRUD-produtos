import {
    Routes
} from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProduct } from './shared/resolvers/get-product.resolve';
import { getProducts } from './shared/resolvers/get-products.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      products: getProducts
    },
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: getProduct
    },

    loadComponent: () =>
      import('./features/edit/edit.component').then((m) => m.EditComponent),
  },
];
