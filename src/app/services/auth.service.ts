import { Injectable } from '@angular/core';
import { User } from '../domain/types';
import { Router } from 'express';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    // constructor(private router: Router) {

    // }

    setToken(token: string) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    isLoggedIn() {
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