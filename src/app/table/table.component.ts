import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CreateWindow } from './createwindow.component/createwindow';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ChangeWindow } from './changewindow.component/changewindow';
import { ClassWindow } from './classwindow.component/classwindow';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import '@angular/common/locales/global/ru'




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
    ReactiveFormsModule,
    CalendarModule
  ],
  providers: [DialogService, MessageService, TaskService, DynamicDialogConfig, ConfirmationService, Router, PrimeNGConfig,],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit,OnDestroy {
  tasks!: Task[];
  checked: boolean = false;
  searchButton: boolean = false;
  // searchStr: any = '';
  formGroup!: any;
  ru:any;
  

  @ViewChild('showButton') showButton: any
  @ViewChild('changeButton') changeButton: any

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public taskService: TaskService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
  ) { 

   }

  ref: DynamicDialogRef | undefined;

  ngOnInit() {

    this.primengConfig.setTranslation(this.taskService.setLanguage())   

    this.tasks = this.taskService.getTasksDataUser();
    
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null)
    })
  }  

  checkboxStatusChange(status:boolean, id: number) {
    this.taskService.checkboxStatusChange(status, id)
  }

  multiSearch(value:string, key:string) {
    this.tasks = this.taskService.multiSearch(value,key)
  }

  clearSearch() {
    this.tasks = this.taskService.getTasksDataUser();
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
      accept: () => { this.deleteTask(id) },
      reject: () => { this.confirmationService.close() }
    })
  };

  deleteTask(id: number) {
    this.taskService.deleteData(id);
    this.tasks = this.taskService.getTasksDataUser()
  }

  showAddTask(id:number) {

    this.taskService.changeCreateTask(id)

    this.ref = this.dialogService.open(CreateWindow, {
      header: 'Задача',
      width: '70%',
      height: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });



    this.ref.onClose.subscribe((task: Task) => {
      this.tasks = this.taskService.getTasksDataUser();
      localStorage.removeItem('changeTask')
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
      default:
        return 'warning';
    }
  }

  addTaskAdmin() {  
    localStorage.clear();
    this.taskService.setData()
    this.taskService.setClass()
    this.tasks = this.taskService.getTasksDataUser();
  }
}


