import { Injectable } from '@angular/core';
import { Task } from '../domain/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // удалить поле
  data: Task[] = [
    {
      id: 0,
      name: 'поиграть',
      data: '1142142',
      description: 'дока 2',
      status: 'Выполнено',
      category: 'дом'
    },

    {
      id: 1,
      name: 'тренировка',
      data: '2142142',
      description: 'ноги',
      status: 'В процессе',
      category: 'работа'
    },

    {
      id: 2,
      name: 'поспать',
      data: '12442',
      description: 'сон',
      status: 'Выполнено',
      category: 'магазин'
    },

    {
      id: 3,
      name: 'поесть',
      data: '4124142',
      description: 'еду',
      status: 'Выполнено',
      category: 'магазин'
    },
  ];

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
    localData.push(item)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('data', localData)
  }

  setData() {
    return localStorage.setItem('dataStorage', JSON.stringify(this.data));
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

}
