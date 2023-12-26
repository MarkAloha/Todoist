import { ClassWindow } from '../table/classwindow.component/classwindow';
import { Component, Input, Output, EventEmitter, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from "../item"
import { Class } from '../domain/types';
import { TaskService } from '../services/task.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-item',
    standalone: true,
    imports: [CommonModule,
              ClassWindow,
              InputTextModule,
              ButtonModule,
            
            ],
    providers: [TaskService],
    templateUrl: './item.component.html',
    styleUrl: './item.component.scss'
})
export class ItemComponent {
    // item: any = ''
    editable:any = signal(false);
    @Input() class!: Class;
    @Output() remove = new EventEmitter<Item>();

    constructor(private taskService: TaskService, public ref: DynamicDialogRef,) {
          
      }

    changeClassWindow(id: number, name: string) {
        this.taskService.changeClass(id, name)
        // this.editable.set(false)
        this.ref.close();
    }

    deleteClassWindow(id: number) {
        this.taskService.deleteClass(id)
        this.ref.close();
    }

    addClass(name: string) {
        this.taskService.addClass(name)
        this.ref.close();
    }

}