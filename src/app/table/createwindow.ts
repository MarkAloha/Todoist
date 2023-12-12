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
    

  ],
  templateUrl: './createwindow.html'
 
})
export class CreateWindow implements OnInit {
  tasks!: Task[];

  @ViewChild('bitBox') bitBox:any
  @ViewChild('showButton') showButton:any

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef, 
    public table: TableComponent) {


    if (typeof document !== 'undefined') {
      // let box: any = document.querySelector('.box')
      
        // const div = this.bitBox.querySelector('.box')
        // console.log('div', div)
      
      document.addEventListener('click', (e)=> {
        const click = e.composedPath().includes(this.bitBox.nativeElement) || e.composedPath().includes(this.table.showButton.nativeElement)
        // || e.composedPath().includes(this.table.changeButton.nativeElement)
        if (!click ) {
          if (this.ref) {
            this.ref.close();
          }
        }

        
        
        // console.log(box)
        // console.log(this.bitBox.nativeElement          )
        // console.log(box)
        // console.log(this.showButton)
        // console.log(this.bitBox)
        // console.log(this.bitBox.nativeElement)
        console.log(click)
      })
      }


  }

  // @HostListener('document:click', ['$event'])
	// onClick(event: Event) {
	// 	if (!this.el.nativeElement.contains(event.target) ) {
	// 		// action
      
  //       // this.ref.close();
      
  //     console.log(event)
	// 	}
	// }


  ngOnInit() {

    


  }





  addTask(name: string) {
    // const raw: any = localStorage.getItem('dataStorage');
    // const dataParse = JSON.parse(raw);
    // let lastIndex = dataParse?.length
    // lastIndex ??= 1
    const raw: any = localStorage.getItem('idLast')
    let idNull = JSON.parse(raw)
    idNull ??= 3

    const idItem = idNull + 1

    idNull = idItem
    localStorage.setItem('idLast', JSON.stringify(idNull))


    const sampleAdd: Task = {
      id: idItem,
      name,
      code: '1142142',
      description: 'Описание',
      status: 'В процессе',
    };
    // console.log(typeof lastIndex)
    this.taskService.addData(sampleAdd);
    this.ref.close();

    // this.taskService.getTasksData2().then((data) => {
    //   this.tasks = data;
    // });

    // console.log('tasks', this.tasks)
    // console.log('data', this.taskService.getTasksData())
  }

  // addItem(description: string) {
  //   this.allItems.unshift({
  //     id:1,
  //     description,
  //     done: false,
  //   });
  // }
}
