import { SearchService } from './../services/search.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../domain/types';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import {
  DynamicDialogModule,
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CreateWindow } from './createwindow';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ChangeWindow } from './changewindow';
import { ClassWindow } from './classwindow';
import { RouterModule, Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    TagModule,
    FormsModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
    ChangeWindow,
    ConfirmDialogModule,
    RouterModule,
    HeaderComponent,
    InputTextModule,
  ],
  providers: [DialogService, MessageService, TaskService, DynamicDialogConfig, ConfirmationService, Router, SearchService ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnDestroy {
  tasks!: Task[];
  checked: boolean = false;
  searchButton: boolean = false;
  searchStr: any = ''

  @ViewChild('showButton') showButton:any
  @ViewChild('changeButton') changeButton:any
  

  constructor(
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    public taskService: TaskService,
    public searchService: SearchService,
    private confirmationService: ConfirmationService
  ) {

    
    }
  

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.tasks = this.taskService.getTasksDataUser();

  }

  // checkedStatus() {

  // }

  nameSearch(value:any) {
    this.tasks = this.searchService.nameSearch(value)
  }

  showAddClass() {
    this.ref = this.dialogService.open(ClassWindow, {
      header: 'Изменить',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  confirm(id: number) {
    this.confirmationService.confirm({
        message: 'Вы уверены, что хотите продолжить?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: () => {this.deleteTask(id)},
        reject: () => {this.confirmationService.close()}
    })};

  deleteTask(id: number) {
    this.taskService.deleteData(id);
    this.tasks = this.taskService.getTasksDataUser()
    // console.log('showButton',this.showButton)
    
  }

  showChangeTask(id:number, name:string) {
    this.ref = this.dialogService.open(ChangeWindow, {
      header: 'Изменить',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    
    localStorage.setItem('changeId', String(id))
    localStorage.setItem('changeName', name)

    this.ref.onClose.subscribe((task: Task) => {
      
      this.tasks = this.taskService.getTasksDataUser();})
    


  }

  showAddTask() {
    this.ref = this.dialogService.open(CreateWindow, {
      header: 'Новая задача',
      width: '70%',
      height: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });



    this.ref.onClose.subscribe((task: Task) => {
      
      this.tasks = this.taskService.getTasksDataUser();

      // if (task) {
      //   this.messageService.add({
      //     severity: 'info',
      //     summary: 'Task Selected',
      //     detail: task.name,
      //   });
      // }
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
    this.tasks = this.taskService.getTasksDataUser();
  }

  consoleLog() {
    console.log('console')
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
    this.taskService.setClass()
    this.tasks = this.taskService.getTasksDataUser();

    // console.log('dataParse', dataParse);
    // console.log('data', this.taskService.getTasksData());
    // this.taskService.getTasksMini().then((data) => {
    //   this.tasks = data;
    // });
  }

  

}
