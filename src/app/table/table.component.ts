import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from '../services/product.service'



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent  {
  // products!: Product[];
  

  constructor(private productService : ProductService ) {}

  // ngOnInit() {
  //     this.productService.getProductsMini().then((data) => {
  //         this.products = data;
  //     });
  // }
}