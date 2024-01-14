import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
import { CreateWindow } from './create-change.window.component/create-change.window';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import '@angular/common/locales/global/ru'
import { TaskService } from '../../services/task.service';
import { FormSearch, SearchForm, Task } from '../../domain/types';
import { ChangeWindow } from '../test.component/testwindow';
import { ClassWindow } from './class.window.component/class.window.component';




@Component({
  selector: 'app-table',
  standalone: true,
  encapsulation:ViewEncapsulation.None,
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
    CalendarModule,
  ],
  providers: [DialogService, MessageService, TaskService, DynamicDialogConfig, ConfirmationService, Router, PrimeNGConfig,],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit,OnDestroy {
  tasks: Task[] = [];
  checked: boolean = false;
  searchButton: boolean = false;
  formGroup: FormGroup<SearchForm>;

  @ViewChild('showButton') showButton: object | undefined
  @ViewChild('changeButton') changeButton: object | undefined

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public taskService: TaskService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.formGroup = new FormGroup<SearchForm>({
      name: new FormControl (null) ,
      category: new FormControl (null) ,
      description: new FormControl (null),
      date: new FormControl (null),
    })
  }

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.primengConfig.setTranslation(this.taskService.setLanguage())   
    this.tasks = this.taskService.getTasksDataUser();  
  }  

  checkboxStatusChange(status:boolean, id: number) {
    this.taskService.checkboxStatusChange(status, id)
  }

  multiSearch() {
    console.log(this.formGroup)
    const formSearch: FormSearch = {
      name: this.formGroup.value.name,
      category: this.formGroup.value.category,
      description: this.formGroup.value.description ,
      date: this.formGroup.value.date,
    }
    this.tasks = this.taskService.multiSearch(formSearch)
  }

  clearSearch() {
    this.tasks = this.taskService.getTasksDataUser();
  }

  showAddClass() {
    this.ref = this.dialogService.open(ClassWindow, {
      header: 'Категории',
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
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasksDataUser()
  }

  showAddTask(id:number) {

    this.taskService.changeCreateTask(id)

    this.ref = this.dialogService.open(CreateWindow, {
      header: 'Задача',
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


