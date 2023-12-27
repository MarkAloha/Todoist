import { Component,Injectable } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { TableModule } from 'primeng/table'
import { TableComponent } from './table/table.component';
import { TaskService } from './services/task.service';
import { RegistrationComponent } from './registration.component/registration.component';



@Component({
  selector: 'app-root',
  standalone: true,
  providers: [TaskService, Router],
  imports: [CommonModule, 
    RouterOutlet, 
    NgFor, 
    FormsModule, 
    TableModule, 
    TableComponent,
    RegistrationComponent,
    RouterModule,
    RouterModule,
     ],
  // providers: [ ]
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  constructor(
    private taskService: TaskService,
    private router: Router,
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
    this.taskService.data
  }

}
