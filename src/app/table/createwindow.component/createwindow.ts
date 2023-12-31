import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Class, Task } from '../../domain/types';
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
import { TableComponent } from '../table.component';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'create-window',
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
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule

  ],
  templateUrl: './createwindow.html',
  styleUrl: './createwindow.scss'

})

export class CreateWindow implements OnInit {
  tasks!: Task[];
  formGroup!: FormGroup;
  changeTask: Task = JSON.parse(localStorage.getItem('changeTask') ?? localStorage.getItem('createTask') ?? 'localChangeNull')
  ClassItem: Class[] | undefined;
  nameChange = localStorage.getItem('changeName') ?? 'null'
  changeId = Number(localStorage.getItem('changeId')) ?? 'null'

  // defaultClass: Class = {id: 1,
  //   name: "string",
  //   userId: 1}
  defaultClass: Class = JSON.parse(localStorage.getItem('classChangeCreate') ?? 'localChangeNull')
  defaultDate: Date = new Date(this.changeTask.data)



  @ViewChild('bitBox') bitBox: any
  @ViewChild('showButton') showButton: any

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef,
    public table: TableComponent) {

    document.addEventListener('click', (e) => {
      this.taskService.checkClickCreateWindow(this.bitBox, this.table, this.ref)
    })
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      defaultClass: new FormControl<Class | null>(null)
    })
    this.ClassItem = this.taskService.getClassDataUser()
  }


  addOrChangeTask(name: string, description: string) {
    this.taskService.addOrChangeTask(this.defaultClass.name, name, this.formGroup.value.date, description);
    // localStorage.removeItem('openCreateOrChangeWindow');
    // localStorage.removeItem('openCreateWindow');
    this.ref.close();
  }
}
