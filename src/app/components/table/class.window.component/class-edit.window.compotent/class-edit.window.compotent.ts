
import { Component, Input, Output, EventEmitter, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Item } from "../../../../item"
import { Class } from '../../../../domain/types';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../../../../services/task.service';
import { ClassWindow } from '../class.window.component';

@Component({
    selector: 'class-change-window',
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
    @Output() updateListClass = new EventEmitter<string>();

    constructor(private taskService: TaskService, public ref: DynamicDialogRef,) {      
        
      }  

    changeClassWindow(id: number | undefined , name: string) {
        this.taskService.changeClass(id, name);
        this.updateListClass.emit()   
        this.setEditable(false)    
    }

    deleteClassWindow(id: number | undefined) {
        this.taskService.deleteClass(id)        
        this.updateListClass.emit()  
    }

    setEditable(item:boolean) {
        this.editable.set(item)
    }
}