import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Class, CreateChangeForm, DivBlock, Task, } from '../../../domain/types';
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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TaskService } from '../../../services/task.service';

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
    DropdownModule,
    SliderModule

  ],
  templateUrl: './create-change.window.html',
  styleUrl: './create-change.window.scss'

})

export class CreateWindow  {
  formGroup: FormGroup;
  changeTask: Task = JSON.parse(localStorage.getItem('changeTask') ?? localStorage.getItem('createTask') ?? 'localChangeNull')
  ClassItem: Class[] = [];
  priority: number = this.changeTask.priority 
  defaultClass: string = JSON.parse(localStorage.getItem('classChangeCreate') ?? 'localChangeNull')
  defaultDate: Date = new Date(this.changeTask.date)
  
  @ViewChild('bitBox') bitBox: DivBlock | null = null
  @ViewChild('showButton') showButton: DivBlock | null = null

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef,
    public table: TableComponent) {

      this.formGroup = new FormGroup<CreateChangeForm>({
        date: new FormControl(this.defaultDate, Validators.required),
        inputClass: new FormControl(this.defaultClass, Validators.required),
        nameTask: new FormControl(this.changeTask.name, Validators.required),
        description: new FormControl(this.changeTask.description, Validators.required),
      })
      this.ClassItem = this.taskService.getClassDataUser()

    document.addEventListener('click', () => {
      this.taskService.checkClickCreateWindow(this.bitBox, this.showButton, this.ref)
    })
  }

  addOrChangeTask() {
    const createChangeForm = {
      name: this.formGroup.value.nameTask,
      category: this.formGroup?.value.inputClass.name ?? this.formGroup?.value.inputClass ,
      date: this.formGroup.value.date ,
      description: this.formGroup.value.description,
      priority: this.priority ,
    }
    this.taskService.addOrChangeTask(createChangeForm);
    this.ref.close();
  }
}
