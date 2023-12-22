import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { User } from '../domain/types';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AuthService {


    constructor(private AuthService: Router, private userService: UserService) {
    }

    getLoginActiveUser() {
        if (typeof window !== 'undefined') {            
            return ((localStorage.getItem('activeUserLogin')) ?? null);
        } else {
            return null
        }
    }

    setPersonalId(id: number, login:string) {
        localStorage.setItem('activeUser', JSON.stringify(id))
        localStorage.setItem('activeUserLogin', login)
        console.log('activeUser', localStorage.getItem('activeUser'))
    }

    getPersonaId() {
        if (typeof window !== 'undefined') {            
            return ((localStorage.getItem('activeUser')) ?? null);
        } else {
            return null
        }
    }

    setToken(token: string) {
        localStorage.setItem('token', token)
    }


    getToken() {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('token') ?? null);
        } else {
            return null
        }
    }

    isLoggedIn() {
        return this.getToken() !== null

    }

    login(userInfo: User): Observable<string | boolean> {
        const userDataLocal = this.userService.getUserData()
        const find = userDataLocal.find((element) => element.email === userInfo.email)
        // Получаем массив со всеми пользователями и ищем совпадения с введеным эмаилом
        console.log('find', find)

        if (userInfo.email === find?.email && userInfo.password === find?.password) {
            this.setToken('davwacrtbdrtdmryftbuyytuadwawd');
            this.setPersonalId(find.id, find.email)
            return of(true)
        }
        // Сравниваем введеный логин с найденым\не найденым логином из массива
        if (userInfo.email === "admin@gmail.com" && userInfo.password === "admin123") {
            this.setToken('davwacrtbdrtdmryftbuyytuadwawd')
            this.setPersonalId(1, 'admin@gmail.com')
            return of(true)
        }
        return throwError(() => new Error('Неправильно набран логин или пароль'))
    }

    logout() {
        localStorage.removeItem('token')
    }
}