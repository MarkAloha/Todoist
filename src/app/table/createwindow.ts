import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Class, Task } from '../domain/types';
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
  ClassItem: Class[] | undefined;
  selectedClass!: Class | string;
  // date!: Date[] 


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
      date: new FormControl<Date | null>(null)
    })
    this.ClassItem = this.taskService.getClassDataUser()

  }


  addTask(name: string, description: string) {

    this.taskService.addData(this.selectedClass, name, this.formGroup.value.date, description);
    this.ref.close();

  }
}
