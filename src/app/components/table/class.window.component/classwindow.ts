import { Component, OnInit,  ElementRef,  } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Class, Task } from '../../../domain/types';
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
import { InputTextModule } from 'primeng/inputtext';
import { ItemComponent } from '../class-edit.window.compotent/item.component';

@Component({
  selector: 'class-window',
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
    ItemComponent,
    InputTextModule,
  ],
  templateUrl: './classwindow.html'

})
export class ClassWindow implements OnInit {
  categories: Class[];
  class: Class[] | null = null
  change = true

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef,
    public table: TableComponent) {
      this.categories = []
  }

  ngOnInit() {
    this.categories = this.taskService.getClassDataUser()
  } 

  addClass(name: string) {   
    this.taskService.addClass(name)
    this.categories = this.taskService.getClassDataUser()
    // this.ref.close();
  }
}
