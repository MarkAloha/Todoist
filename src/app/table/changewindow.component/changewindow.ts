import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../domain/types';
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
  nameChange = localStorage.getItem('changeName') ?? null
  changeId = Number(localStorage.getItem('changeId')) ?? null

  @ViewChild('bitBox') bitBox: any
  @ViewChild('changeButton') changeButton: any

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef,
    public table: TableComponent) {

    if (typeof document !== 'undefined') {
      // let box: any = document.querySelector('.box')

      // const div = this.bitBox.querySelector('.box')
      // console.log('div', div)

      document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(this.bitBox.nativeElement)
          // || e.composedPath().includes(this.table.showButton.nativeElement)
          || e.composedPath().includes(this.table.changeButton.nativeElement)
        if (!click) {
          if (this.ref) {
            this.ref.close();
          }
        }

      })
    }

  }

  ngOnInit() {
    this.tasks = this.taskService.getTasksDataUser();
  }


  changeTask(name: string) {

    this.taskService.changeData(name, this.changeId)
    this.ref.close();

  }

}
