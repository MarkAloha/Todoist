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
import { CommonModule } from '@angular/common';  
import { TableComponent } from './table.component';

@Component({   
    selector: 'product-list-demo', 
  providers: [DialogService, MessageService, ProductService],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    TagModule,
    DynamicDialogModule,
    ToastModule,
    TableComponent
  ],
  // templateUrl: './createwindow.html'
  template: ` 
  
<label for="addItemInput">add</label>
<input #newItem (keyup.enter)="AddTask(newItem.value); newItem.value=' '" id="addItemInput">
<button (click)="AddTask(newItem.value); newItem.value=' '" class="btn-add">Добавить новую запись</button>
`,
})
export class CreateWindow implements OnInit  {
  products!: Product[];

  constructor(
    private productService: ProductService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.productService
      .getProductsData2()
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

  AddTask(name: string) {
    const testAdd = {
      id: '1',
      name,
      code: '1142142',
      description: 'последний раз',
      status: 'Выполнено',
    };
    this.productService.getData(testAdd);
    this.productService.getProductsData2().then((data) => {
      this.products = data;
    });
    
    // console.log('products', this.products)
    // console.log('data', this.productService.getProductsData())
  }
  

  // addItem(description: string) {
  //   this.allItems.unshift({
  //     id:1, 
  //     description,
  //     done: false,
  //   });
  // }
}
