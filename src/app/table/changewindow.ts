import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  selector: 'change-window',
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
  templateUrl: './changewindow.html'
 
})
export class ChangeWindow implements OnInit {
  tasks!: Task[];

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef, 
    public table: TableComponent) {


      }


  ngOnInit() {
  }


}
