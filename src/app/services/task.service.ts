import { Injectable } from '@angular/core';
import { Class, Task } from '../domain/types';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // удалить поле
  data: Task[] = [
    {
      id: 0,
      name: 'поиграть',
      data: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'дока 2',
      status: 'Выполнено',
      category: 'дом'
    },

    {
      id: 1,
      name: 'тренировка',
      data: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'ноги',
      status: 'В процессе',
      category: 'работа'
    },

    {
      id: 2,
      name: 'поспать',
      data: 'Wed Dec 27 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'сон',
      status: 'Выполнено',
      category: 'магазин'
    },

    {
      id: 3,
      name: 'поесть',
      data: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'еду',
      status: 'Выполнено',
      category: 'магазин'
    },
  ];
  dataClass: Class[] = [
      {id: 1, name: 'Работа' },
      {id: 2, name: 'Дом' },
      {id: 3, name: 'Магазин' },
      {id: 4, name: 'Учёба' },
      {id: 5, name: 'Быт' },
  ]

  

  deleteClass(id:number) {
    const localData = this.getClassData()

    let index = localData.findIndex(el => el.id === id)
    localData.splice(index, 1)
    localStorage.setItem('dataClass', JSON.stringify(localData))
    console.log('localClass', localData) 

  }

  deleteData(id:number) {
    const localData = this.getTasksData()

    let index = localData.findIndex(el => el.id === id);

    localData.splice(index, 1)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('local', localData) 

  }

  changeClass(id: number, name: string) {
    const localData = this.getClassData()

    let index = localData.findIndex(el => el.id === id)
    let item = localData[index].name = name

    localStorage.setItem('dataClass', JSON.stringify(localData))
    console.log(localData)
  }

  changeData(name:string, changeId:number) {    
    const localData = this.getTasksData()
    
    let index = localData.findIndex(el => el.id === changeId);

    let item = localData[index].name = name

    localStorage.setItem('dataStorage', JSON.stringify(localData))

    // console.log(item)

  }

  checkCreateOrChangeClass(selectedClass:string | Class) {
    if(typeof selectedClass == 'object'){

      const classItem:Class = selectedClass

      return classItem.name

    } else {      

      this.addClass(selectedClass)

      return selectedClass
    }    
  }

  createIdItem () {
    let idLast: any = localStorage.getItem('idLast')
    let idNull = JSON.parse(idLast)
    idNull ??= 3
    const idItem = idNull + 1
    idLast = idItem
    localStorage.setItem('idLast', JSON.stringify(idLast))
    return idItem
  }

  addData(selectedClass:string | Class, name: string, data: string) {
    const localData = this.getTasksData()


    const sampleAdd: Task = {
      id: this.createIdItem(),
      name,
      data,
      description: 'Описание',
      category: this.checkCreateOrChangeClass(selectedClass),
      status: 'В процессе',
    };



    localData.unshift(sampleAdd)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('data', localData)
  }

  addClass(name:string) {
    const localData = this.getClassData()

    const idLast: any = localStorage.getItem('idLastClass')
    let idNull = JSON.parse(idLast)
    idNull ??= 5
    const id = idNull + 1
    idNull = id
    localStorage.setItem('idLastClass', JSON.stringify(idNull))

    const item = {
      name,
      id,
    }
    localData.push(item)
    localStorage.setItem('dataClass', JSON.stringify(localData))
    console.log('dataClass', localData)
  }

  setData() {
    return localStorage.setItem('dataStorage', JSON.stringify(this.data));
   }
  setClass() {
    return localStorage.setItem('dataClass', JSON.stringify(this.dataClass));
   }

  getTasksData(): Task[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('dataStorage') ?? '[]');
    } else {
      return [];
    }
  }
  getClassData(): Class[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('dataClass') ?? '[]');
    } else {
      return [];
    }
  }

  checkClickCreateWindow(bitBox:any, table:any, ref:any) {
    if (typeof document !== 'undefined') {    
      document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(bitBox.nativeElement) || e.composedPath().includes(table.showButton.nativeElement)
        // || e.composedPath().includes(this.table.changeButton.nativeElement)
        if (!click) {
          if (ref) {
            ref.close();
          }
        }
      })
    }
  }

}
