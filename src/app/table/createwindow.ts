import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({   
    selector: 'product-list-demo', 
  providers: [DialogService, MessageService, ProductService],
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    TagModule,
    DynamicDialogModule,
    ToastModule
  ],
  templateUrl: './createwindow.html'
//   template: ` <p-table [value]="products" responsiveLayout="scroll" [paginator]="true" [rows]="5" [responsive]="true">
//   <ng-template pTemplate="header">
//       <tr>
//           <th pSortableColumn="name">Name <p-sortIcon field="vin"></p-sortIcon></th>
//           <th pSortableColumn="year">Image</th>
//           <th pSortableColumn="price">Brand <p-sortIcon field="price"></p-sortIcon></th>
//           <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
//           <th style="width:4em"></th>
//       </tr>
//   </ng-template>
//   <ng-template pTemplate="body" let-product>
//       <tr>
//           <td>{{ product.name }}</td>
//           <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2" /></td>
//           <td>{{ product.price }}</td>
//           <td>
//               <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
//           </td>
//           <td>
//               <button type="button" pButton icon="pi pi-plus" (click)="selectProduct(product)"></button>
//           </td>
//       </tr>
//   </ng-template>
// </p-table>`,
})
export class ProductListDemo implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((products) => (this.products = products));
  }

  selectProduct(product: Product) {
    this.ref.close(product);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'danger'
    }
  }
}
