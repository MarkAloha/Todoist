import { routes } from './../../../../Angular-project/src/app/app.routes';
import { Injectable } from '@angular/core';
import { User } from '../domain/types';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    
    constructor(private router: Router) {

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
        console.log('222',this.getToken())
        return this.getToken() !== null

    }

    login(userInfo: User): Observable<string | boolean> {
        if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123') {
            this.setToken('davwacrtbdrtdmryftbuyytuadwawd')
            return of(true)
        }
        return throwError(() => new Error('Failed Login'))
    }
}