import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Class, FormSearch, MiniTask, Task, DivBlock, } from '../domain/types';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  // удалить поле
  data: Task[] = [
    {
      id: 0,
      name: 'спать',
      date: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'на кровати',
      status: true,
      category: 'Дом',
      userId: 1,
      priority: 1
    },

    {
      id: 1,
      name: 'тренировка',
      date: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'ноги(пропустить)',
      status: false,
      category: 'Спорт',
      userId: 1,
      priority: 23
    },

    {
      id: 2,
      name: 'поспать',
      date: 'Wed Dec 27 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'прогуглить что это',
      status: true,
      category: 'Важное',
      userId: 1,
      priority: 47
    },

    {
      id: 3,
      name: 'поесть',
      date: 'Tue Dec 26 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      description: 'еду',
      status: false,
      category: 'магазин',
      userId: 1,
      priority: 6
    },
  ];
  dataClass: Class[] = [
    { id: 1, name: 'Работа', userId: 1 },
    { id: 2, name: 'Дом', userId: 1 },
    { id: 3, name: 'Магазин', userId: 1 },
    { id: 4, name: 'Учёба', userId: 1 },
    { id: 5, name: 'Важно', userId: 1 },
    { id: 6, name: 'Спорт', userId: 1 },
  ]


  constructor(private authService: AuthService) {

  }

  multiSearch(formSearch: FormSearch) {
    let localData = this.getTasksDataUser()
    console.log(localData)

    if (formSearch.name) {
      localData = localData.filter(item => item.name?.includes(String(formSearch.name)))      
    }
    if (formSearch.description) {
      localData = localData.filter(item => item.description?.includes(String(formSearch.description)))
    }
    if (formSearch.category) {
      localData = localData.filter(item => item.category?.includes(String(formSearch.category)))
    }
    if (formSearch.date) {
      const newLocalData = localData.filter(item => new Date(item.date??'data task undefined').getTime() <= new Date(String(formSearch.date)).getTime())
      return newLocalData
    }
    return localData
  }

  checkboxStatusChange (status: boolean, id: number) {
    // изменяет статус
    const localData = this.getTasksData()
    const index = localData.findIndex(el => el.id === id)
    localData[index].status = !status
    localStorage.setItem('dataStorage', JSON.stringify(localData))
  }

  changeCreateTask(id: number) {
    // при использовании кнопки "создать задачу" подготавливает данные для окна, в зависимости от задачи.

    if (id === -1) {
    
    const openCreateOrChangeWindow = 'openCreateWindow'

    const classChangeCreate = {
      id: null,
    name: null,
    userId: null
    }

    const createTask = {
      id: null,
      name: null,
      description: null,
      userId: null,
      date: new Date(),
      priority: null
  }

    localStorage.setItem('openCreateOrChangeWindow', openCreateOrChangeWindow)
    localStorage.setItem('createTask', JSON.stringify(createTask))
    localStorage.setItem('classChangeCreate', JSON.stringify(classChangeCreate))
    
  }

  else {

    const openCreateOrChangeWindow = 'openChangeWindow'

    // Получаем объект задачи которую изменяем
    const localClassData = this.getClassDataUser()
    const localDataTasks = this.getTasksDataUser()
    const localChangeTask = localDataTasks.find(el => el.id == id)

    // Получаем объект категорий 
    const indexClass = localClassData.findIndex(el => el?.name?.toLowerCase() === localChangeTask?.category?.toLowerCase()?? '')   
    const classChangeCreate = localClassData[indexClass] ?? 'Категория не найдена'

    localStorage.setItem('openCreateOrChangeWindow', openCreateOrChangeWindow)
    localStorage.setItem('changeTask', JSON.stringify(localChangeTask))
    localStorage.setItem('classChangeCreate', JSON.stringify(classChangeCreate))
  }

  }

  deleteClass(id: number| undefined) {
    const localData = this.getClassData()
    let index = localData.findIndex(el => el.id === id)
    localData.splice(index, 1)
    localStorage.setItem('dataClass', JSON.stringify(localData))
  }

  deleteTask(id: number| undefined) {
    const localData = this.getTasksData()
    let index = localData.findIndex(el => el.id === id)
    localData.splice(index, 1)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
  }

  changeClass(id: number | undefined, name: string) {
    const localData = this.getClassData()
    let index = localData.findIndex(el => el.id === id)
    localData[index].name = name
    localStorage.setItem('dataClass', JSON.stringify(localData))
  }

  changeTask(item: MiniTask) {
    let localData: Task[] = this.getTasksData()
    const changeTask = JSON.parse(localStorage.getItem('changeTask') ?? '{}')
    let index =  localData.findIndex(el => el.id === changeTask.id);  
   
    localData[index].category = item.category
    localData[index].name = item.name
    localData[index].date = item.date
    localData[index].description = item.description
    localData[index].priority = item.priority

    localStorage.setItem('dataStorage', JSON.stringify(localData))
  }

  checkCreateOrChangeClass(selectedClass: string | Class) {
    if (typeof selectedClass == 'object') {
      const classItem: Class = selectedClass
      return classItem.name

    } else {
      this.addClass(selectedClass)
      return selectedClass
    }
  }

  setLanguage() {
    const ru = {
      firstDayOfWeek: 1,
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Воск','Пон' , 'Вт' , 'Ср' , 'Четв' , 'Пят' , 'Суб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь','Октябрь','Ноябрь','Декабрь' ],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
      today: 'Сегодня',
      clear: 'Очистить'
  }
  return ru
  }

  createIdTask() {    
    let idLast: number = JSON.parse(localStorage.getItem('idLast') ?? '3')
    const id = idLast + 1
    localStorage.setItem('idLast', JSON.stringify(id))
    return id
  }

  
  addOrChangeTask(item: MiniTask) {
    // при открытии окна "создать" или "изменить" мы сетапим значение, здесь читаем его и решаем что делаем дальше, после удаляем
    const openCreateOrChangeWindow = localStorage.getItem('openCreateOrChangeWindow')
    if (openCreateOrChangeWindow === 'openCreateWindow') {
      this.addTask(item)
      localStorage.removeItem('openCreateOrChangeWindow')
    }
    if (openCreateOrChangeWindow === 'openChangeWindow') {
      this.changeTask(item)
      localStorage.removeItem('openCreateOrChangeWindow')
    }
    else return
  }

  addTask(item: MiniTask) {
    const localData = this.getTasksData()
    const userId = JSON.parse(this.authService.getPersonaId() ?? '1')
    const category = this.checkCreateOrChangeClass(item.category)
    const id = this.createIdTask()

    const sampleAdd: Task = {
      id,
      name: item.name,
      date: item.date,
      description: item.description,
      category,
      status: false,
      userId,
      priority: item.priority
    };
    localData.unshift(sampleAdd)
    localStorage.setItem('dataStorage', JSON.stringify(localData))
  }

  addClass(name: string) {
    const localDataClass = this.getClassData()
    // получаем ID активного пользователя
    const userId = JSON.parse(this.authService.getPersonaId() ?? '1')
    // Получаем последний ID или устанавливаем, прибавляем +1 записываем в localStorage
    const idLast: number = JSON.parse(localStorage.getItem('idLastClass')?? '5') 
    const id = idLast + 1
    localStorage.setItem('idLastClass', JSON.stringify(id))

    const item = {
      name,
      id,
      userId
    }
    localDataClass.push(item)
    localStorage.setItem('dataClass', JSON.stringify(localDataClass))
  }

  setData() {
    return localStorage.setItem('dataStorage', JSON.stringify(this.data));
  }
  setClass() {
    return localStorage.setItem('dataClass', JSON.stringify(this.dataClass));
  }

  getTasksDataUser() {
    const localData = this.getTasksData()
    const localDataUser = localData.filter(el => el.userId === JSON.parse(this.authService.getPersonaId() ?? '0'))
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
    const localDataUser = localData.filter(el => el.userId === JSON.parse(this.authService.getPersonaId() ?? '0'))
    return localDataUser
  }

  getClassData(): Class[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('dataClass') ?? '[]');
    } else {
      return [];
    }
  }

  checkClickCreateWindow(bitBox: DivBlock | null, table: DivBlock | null, ref: DynamicDialogRef) {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        const click = 
        e.composedPath().includes(bitBox?.nativeElement as HTMLElement) || 
        e.composedPath().includes(table?.nativeElement as HTMLElement)
        if (!click) {
          if (ref) {
            ref.close();
          }
        }
      })
    }
  }

}
