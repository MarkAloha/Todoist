
import { Component, Input, Output, EventEmitter, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from "../../../item"
import { Class } from '../../../domain/types';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../../../services/task.service';
import { ClassWindow } from '../class.window.component/classwindow';

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
    
    editable: WritableSignal<boolean> = signal(false);
    @Input() class: Class | null = null;
    @Output() remove = new EventEmitter<Item>();

    constructor(private taskService: TaskService, public ref: DynamicDialogRef,) {      
        
      }  

    changeClassWindow(id: number, name: string) {
        this.taskService.changeClass(id, name)
        this.ref.close();
    }

    deleteClassWindow(id: number) {
        this.taskService.deleteClass(id)        
        this.ref.close();
    }
}