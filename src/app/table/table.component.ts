import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../domain/types';
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
import { ChangeWindow } from './changewindow';

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
    ChangeWindow
  ],
  providers: [DialogService, MessageService, TaskService, DynamicDialogConfig],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnDestroy {
  tasks!: Task[];

  @ViewChild('showButton') showButton:any
  @ViewChild('changeButton') changeButton:any

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public taskService: TaskService
  ) {

    
    }
  

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.tasks = this.taskService.getTasksData();

  }

  deleteTask(id: number) {
    this.taskService.deleteData(id);
    this.tasks = this.taskService.getTasksData()
    console.log('showButton',this.showButton)
  }

  changeTask() {
    this.ref = this.dialogService.open(ChangeWindow, {
      header: 'Изменить',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  show() {
    this.ref = this.dialogService.open(CreateWindow, {
      header: 'Новая задача',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });



    this.ref.onClose.subscribe((task: Task) => {
      
      this.tasks = this.taskService.getTasksData();

      if (task) {
        this.messageService.add({
          severity: 'info',
          summary: 'Task Selected',
          detail: task.name,
        });
      }
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

  clearTaskAdmin() {
    localStorage.clear();
    this.tasks = this.taskService.getTasksData();
  }

  consoleLog() {

  }

  addTaskAdmin() {
    const data = {
      id: '1',
      name: 'поиграть в доту',
      code: '1142142',
      description: 'последний раз',
      status: 'Выполнено',
    };
    const dataStorage = {};
    // localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
    const raw: any = localStorage.getItem('dataStorage');
    const dataParse = JSON.parse(raw);
    // console.log(dataParse.lastIndexOf(Object))
    // this.taskService.addData(dataParse);
    this.taskService.setData()
    this.tasks = this.taskService.getTasksData();

    // console.log('dataParse', dataParse);
    // console.log('data', this.taskService.getTasksData());
    // this.taskService.getTasksMini().then((data) => {
    //   this.tasks = data;
    // });
  }

  

}
