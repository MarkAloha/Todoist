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
      name: 'поиграть в доту',
      code: '1142142',
      description: 'последний раз',
      status: 'Выполнено',
    },

    {
      id: 1,
      name: 'тренировка',
      code: '2142142',
      description: 'ноги',
      status: 'В процессе',
    },

    {
      id: 2,
      name: 'поспать',
      code: '12442',
      description: 'сон',
      status: 'Выполнено',
    },

    {
      id: 3,
      name: 'поесть',
      code: '4124142',
      description: 'еду',
      status: 'Выполнено',
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
    delete(localData[id])
    localStorage.setItem('dataStorage', JSON.stringify(localData))
    console.log('id', id)
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
