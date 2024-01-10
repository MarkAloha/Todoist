
import { Component, Input, Output, EventEmitter, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from "../../../item"
import { Class } from '../../../domain/types';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../../../services/task.service';
import { ClassWindow } from '../class.window.component/class.window.component';

@Component({
    selector: 'app-item',
    standalone: true,
    imports: [CommonModule,
              ClassWindow,
              InputTextModule,
              ButtonModule,
            
            ],
    providers: [TaskService],
    templateUrl: 'class-edit.window.compotent.html',
    styleUrl: 'class-edit.window.compotent.scss'
})
export class ClassEditWindow {
    
    editable: WritableSignal<boolean> = signal(false);
    @Input() class: Class | null = null;

    constructor(private taskService: TaskService, public ref: DynamicDialogRef,) {      
        
      }  

    changeClassWindow(id: number | undefined , name: string) {
        this.taskService.changeClass(id, name)
        this.ref.close();
    }

    deleteClassWindow(id: number | undefined) {
        this.taskService.deleteClass(id)        
        this.ref.close();
    }
}