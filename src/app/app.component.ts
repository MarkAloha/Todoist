import { Component,Injectable } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { TableModule } from 'primeng/table'
import { Item } from './item';
import { TableComponent } from './table/table.component';
import { ProductService } from './services/product.service';
import { AuthorizationComponent } from './authorization/authorization.component';



@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ProductService],
  imports: [CommonModule, 
    RouterOutlet, 
    NgFor, 
    FormsModule, 
    ItemComponent, 
    TableModule, 
    TableComponent,
    AuthorizationComponent],
  // providers: [ ]
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  constructor(
    private productService: ProductService
  ) {}


  title = 'todo';
  done = true;

  filter: 'all' | 'active' | 'done' = 'all';

  // tasks!: Task[]

  allItems = [
    {id:1, description: 'dota game', done: true },
    {id:2, description: 'training', done: true },
    {id:3, description: 'eat', done: true },
    {id:4, description: 'sleep', done: false },
    {id:5, description: 'drink', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter ? item.done : !item.done
    );
  } 

  remove(item: any) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  callData = () => {
    this.productService.data
  }

}
