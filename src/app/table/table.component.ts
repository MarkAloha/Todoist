import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple'
import { RatingModule } from 'primeng/rating'
// import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RippleModule, 
     RatingModule, TagModule,
    FormsModule
  ],
  // providers: [ProductService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
        default: return 'warning'
    }
  }
}
