import { Component, OnInit, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../domain/types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table.component';
import { RouterModule, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'change-window',
  providers: [TaskService, DynamicDialogRef, Router, DynamicDialogConfig, RouterModule],
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
    DropdownModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './testwindow.html'

})
export class ChangeWindow implements OnInit {

  tasks!: Task[];
  cities: any= [{ name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }]
  selectedCity!: any
  formGroup!: FormGroup;

  constructor(private taskService: TaskService, private router: Router,) {    

  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      inputClass: new FormControl<string>(''),
    })
  }


}
