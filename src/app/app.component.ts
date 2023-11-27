import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo';
  done = true

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'dota game', done: true },
    { description: 'training', done: true },
    { description: 'eat', done: true },
    { description: 'sleep', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter ? item.done : !item.done
    );
  }

  addItem(description: string) {
    this.allItems.unshift({
      description, done: false
    });    
    console.log(this.allItems)
  }  

  editItem() {
    
  }
}
