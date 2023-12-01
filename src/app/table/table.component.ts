import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import {
  DynamicDialogModule,
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CreateWindow } from './createwindow';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    TagModule,
    FormsModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
  ],
  providers: [
    DialogService,
    MessageService,
    ProductService,
    DynamicDialogConfig,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnDestroy {
  products!: Product[];

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

 
  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }

  

  show() {
    this.ref = this.dialogService.open(CreateWindow, {
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: product.name,
        });
      }
    });

    this.ref.onMaximize.subscribe((value: any) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Выполнено':
        return 'success';
      case 'В процессе':
        return 'warning';
      default:
        return 'warning';
    }
  }

  // getLocalStorageTwo(){
  //   this.productService.setData()
  // }

  getLocalStorage() {

    const data = {
      id: '1',
      name: 'поиграть в доту',
      code: '1142142',
      description: 'последний раз',
      status: 'Выполнено',
    };
   
    
    localStorage.setItem('dataStorage', JSON.stringify(data));
    const raw:any = localStorage.getItem('dataStorage'); 
    const dataParse = JSON.parse(raw);  
    
    
    this.productService.getData(dataParse)
    console.log('dataParse', dataParse)
    console.log('data',this.productService.getProductsData())
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    })
  }
}
