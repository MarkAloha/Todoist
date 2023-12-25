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

    nameSearch (value:any) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.name?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    descriptionSearch(value:any) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.description?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    categorySearch (value:any) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.category?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }
    dataSearch (value:any) {
        const localData = this.taskService.getTasksDataUser()
        const newLocalData = localData.filter(item => item.name?.includes(value))
        console.log(newLocalData)
        return newLocalData ?? []

    }



}