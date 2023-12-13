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
      { name: 'Работа' },
      { name: 'Дом' },
      { name: 'Магазин' },
      { name: 'Учёба' },
      { name: 'Быт' },
  ]

  

  // constructor() {
  //   // const dataStorage = this.data;

  //   // if (typeof window !== 'undefined') {
  //   //   localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
  //   //   const raw: any = localStorage.getItem('dataStorage');
  //   //   const dataParse = JSON.parse(raw);

  //   //   console.log(dataStorage, 'dataStorage');
  //   //   console.log(dataParse, 'dataParse');
  //   // }

  //   // localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
  //   // const raw: any = localStorage.getItem('dataStorage');
  //   // const dataParse = JSON.parse(raw);

  //   // console.log(dataStorage, 'dataStorage');
  //   // console.log(dataParse, 'dataParse');
  // }

  deleteData(id:number) {
    const localData = this.getTasksData()

    // let searchName = id;
    let index = localData.findIndex(el => el.id === id);

    localData.splice(index, 1)
    // delete(localData[index])
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('id', id)
    console.log('local', localData)
    // console.log('index', index)
    

  }

  changeData(name:string, changeId:number) {    
    const localData = this.getTasksData()
    
    let index = localData.findIndex(el => el.id === changeId);

    let item = localData[index].name = name

    localStorage.setItem('dataStorage', JSON.stringify(localData))

    // console.log(item)

  }

  addData(item:Task) {
    const localData = this.getTasksData()
    localData.unshift(item)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('data', localData)
  }
  addClass(item:Class) {
    const localData = this.getClassData()
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

  // getAddTask(name: string) {
  //   return Promise.resolve(
  //     this.data.unshift({
  //       id: '1',
  //       name,
  //       code: '1142142',
  //       description: '1',
  //       status: 'В процессе',
  //     })
  //   );
  // }

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

  // addClassCreateWindow() {
  //   if (typeof this.selectedCity.name)
  // }

}
