import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ProductListDemo } from './createwindow';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';



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
    ProductListDemo,
    ToastModule,
    DynamicDialogModule
  ],
  providers: [DialogService, MessageService, ProductService, DynamicDialogRef],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  products!: Product[];


  ref: DynamicDialogRef | undefined;

  constructor(
    private productService: ProductService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }


  show() {
      this.ref = this.dialogService.open(ProductListDemo, {
          header: 'Select a Product',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
      });

      this.ref.onClose.subscribe((product: Product) => {
          if (product) {
              this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
          }
      });

      this.ref.onMaximize.subscribe((value:any) => {
          this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
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
      case 'WORK':
        return 'В процессе';
      case 'DONE':
        return 'danger';
      default:
        return 'warning';
    }
  }
}
