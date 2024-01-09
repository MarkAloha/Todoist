import { Component, OnInit} from '@angular/core';
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

  constructor(private taskService: TaskService, private router: Router,) {    

  }

  ngOnInit() {    
  }


}
