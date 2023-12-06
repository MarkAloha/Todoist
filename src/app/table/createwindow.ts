import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../domain/types';
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
  selector: 'task-list-demo',
  providers: [DialogService, MessageService, TaskService],
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
    TableComponent,
  ],
  // templateUrl: './createwindow.html'
  template: `
    <label for="addItemInput">Мне нужно</label>
    <input
      #newItem
      (keyup.enter)="addTask(newItem.value); newItem.value = ' '"
      id="addItemInput"
    />
    <button
      (click)="addTask(newItem.value); newItem.value = ' '"
      class="btn-add"
    >
      запланировать!
    </button>
  `,
})
export class CreateWindow implements OnInit {
  tasks!: Task[];

  constructor(private taskService: TaskService, public ref: DynamicDialogRef) {}

  ngOnInit() {
    // this.taskService
    //   .getTasksData2()
    //   .then((tasks) => (this.tasks = tasks));
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //     default:
  //       return 'danger';
  //   }
  // }

  addTask(name: string) {
    // const raw: any = localStorage.getItem('dataStorage');
    // const dataParse = JSON.parse(raw);
    // let lastIndex = dataParse?.length
    // lastIndex ??= 1
    const raw:any = localStorage.getItem('idLast')
    let idNull = JSON.parse(raw)
    idNull ??=0

    const idItem = idNull + 1 
    
    idNull = idItem
    localStorage.setItem('idLast', JSON.stringify(idNull))
    

    const sampleAdd: Task = {
      id: idItem,
      name,
      code: '1142142',
      description: 'Описание',
      status: 'В процессе',
    };
    // console.log(typeof lastIndex)
    this.taskService.addData(sampleAdd);
    this.ref.close();

    // this.taskService.getTasksData2().then((data) => {
    //   this.tasks = data;
    // });

    // console.log('tasks', this.tasks)
    // console.log('data', this.taskService.getTasksData())
  }

  // addItem(description: string) {
  //   this.allItems.unshift({
  //     id:1,
  //     description,
  //     done: false,
  //   });
  // }
}
