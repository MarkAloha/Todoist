import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Class, Task } from '../domain/types';
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
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule

  ],
  templateUrl: './createwindow.html',
  styleUrl: './createwindow.scss'

})
export class CreateWindow implements OnInit {
  tasks!: Task[];
  formGroup!: FormGroup;
  cities: Class[] | undefined;
  selectedCity!: Class
  // date!: Date[] 


  @ViewChild('bitBox') bitBox: any
  @ViewChild('showButton') showButton: any

  constructor(private taskService: TaskService, public ref: DynamicDialogRef, private el: ElementRef,
    public table: TableComponent) {


    if (typeof document !== 'undefined') {    
      document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(this.bitBox.nativeElement) || e.composedPath().includes(this.table.showButton.nativeElement)
        // || e.composedPath().includes(this.table.changeButton.nativeElement)
        if (!click) {
          if (this.ref) {
            this.ref.close();
          }
        }
        // console.log(box)
        // console.log(this.bitBox.nativeElement)
        // console.log(box)
        // console.log(this.showButton)
        // console.log(this.bitBox)
        // console.log(this.bitBox.nativeElement)
        // console.log(click)
      })
    }


  }

  ngOnInit() {
    

    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null)
    })

    
    this.cities = this.taskService.getClassData()

  
  }
  
  addClassWindow() {

    let nameSelected = this.selectedCity.name
    let name = this.selectedCity

    console.log('name',name)

    if(typeof nameSelected == 'undefined'){
      const classItem:any = {
        name
      }
      this.taskService.addClass(classItem)
      return classItem.name
    } else {
      return nameSelected
    }

    
    
  }

  addTask(name: string) {
    const classSelected = this.addClassWindow()
    // const raw: any = localStorage.getItem('dataStorage');
    // const dataParse = JSON.parse(raw);
    // let lastIndex = dataParse?.length
    // lastIndex ??= 1
    const idLast: any = localStorage.getItem('idLast')
    let idNull = JSON.parse(idLast)
    idNull ??= 3

    let data = this.formGroup.value.date

    const idItem = idNull + 1
    idNull = idItem
    localStorage.setItem('idLast', JSON.stringify(idNull))


    // const classLocalData = 

    const sampleAdd: Task = {
      id: idItem,
      name,
      data,
      description: 'Описание',
      category: classSelected,
      status: 'В процессе',
    };
    // console.log('formGroup', this.formGroup)
    this.taskService.addData(sampleAdd);
    this.ref.close();

    console.log('selectedCity', this.selectedCity.name)

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
