import { TaskService } from './task.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { User } from '../domain/types';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SearchService {


    constructor(private AuthService: Router, private userService: UserService, private taskService: TaskService) {
    }

    multiSeatch (value:string, key:string){
        const localData = this.taskService.getTasksDataUser()
        if (key === 'nameSearch'){
            const newLocalData = localData.filter(item => item.name?.includes(value))
            return newLocalData
        }
        if (key === 'descriptionSearch') {
            const newLocalData = localData.filter(item => item.name?.includes(value))
            return newLocalData
        }
        if (key === 'categorySearch') {
            const newLocalData = localData.filter(item => item.name?.includes(value))
            return newLocalData
        }
        else return []
    }

    nameSearch (value:string) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.name?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    descriptionSearch(value:string) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.description?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    categorySearch (value:string) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.category?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    dataSearch (value:any) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => new Date(item.data).getTime()<new Date(value).getTime())
        console.log(localData)
        return newLocalData ?? []

    }



}