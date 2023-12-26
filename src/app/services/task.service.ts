import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Class, Task } from '../domain/types';

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
      category: 'дом',
      userId: 1
    },

    {
      id: 1,
      name: 'тренировка',
      data: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'ноги',
      status: 'В процессе',
      category: 'работа',
      userId: 1
    },

    {
      id: 2,
      name: 'поспать',
      data: 'Wed Dec 27 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'сон',
      status: 'Выполнено',
      category: 'магазин',
      userId: 1
    },

    {
      id: 3,
      name: 'поесть',
      data: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'еду',
      status: 'Выполнено',
      category: 'магазин',
      userId: 1
    },
  ];
  dataClass: Class[] = [
      {id: 1, name: 'Работа', userId: 1 },
      {id: 2, name: 'Дом', userId: 1 },
      {id: 3, name: 'Магазин', userId: 1 },
      {id: 4, name: 'Учёба', userId: 1 },
      {id: 5, name: 'Быт', userId: 1 },
  ]


  constructor(private authService: AuthService) {

  }
  

  changeTask(id:number) {
    const localData = this.getTasksDataUser()
    const changeTask = localData.find(el => el.id === id)
    localStorage.setItem('changeTask', JSON.stringify(changeTask))
  }

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
    localData[index].name = name

    localStorage.setItem('dataClass', JSON.stringify(localData))
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

  addData(selectedClass:string | Class, name: string, data: string, description: string) {
    const localData = this.getTasksData()
    const userId = JSON.parse(this.authService.getPersonaId()?? '1')
    const category = this.checkCreateOrChangeClass(selectedClass)
    const id = this.createIdItem()

    const sampleAdd: Task = {
      id,
      name,
      data,
      description,
      category,
      status: 'В процессе',
      userId
    };



    localData.unshift(sampleAdd)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('data', localData)
  }

  addClass(name:string) {
    const localData = this.getClassData()
    const userId = JSON.parse(this.authService.getPersonaId()?? '1')

    const idLast: any = localStorage.getItem('idLastClass')
    let idNull = JSON.parse(idLast)
    idNull ??= 5
    const id = idNull + 1
    idNull = id
    localStorage.setItem('idLastClass', JSON.stringify(idNull))

    const item = {
      name,
      id,
      userId
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

  getTasksDataUser() {
   const localData = this.getTasksData()
   const localDataUser = localData.filter(el => el.userId === JSON.parse(this.authService.getPersonaId()?? '0') )
   return localDataUser
  }

  getTasksData(): Task[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('dataStorage') ?? '[]');
    } else {
      return [];
    }
  }

  getClassDataUser() {
    const localData = this.getClassData()
    const localDataUser = localData.filter(el => el.userId === JSON.parse(this.authService.getPersonaId()?? '0') )
    return localDataUser
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
