import { Injectable } from '@angular/core';
import { User } from '../domain/types';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    createUserId() {
        let idLast: string = (localStorage.getItem('idLastUser')?? '1')
        let idNull = JSON.parse(idLast)
        idNull ??= 3
        const idItem = idNull + 1
        idLast = idItem
        localStorage.setItem('idLastUser', JSON.stringify(idLast))
        return idItem
    }

    addUser(login: string, password: string) {

        const userDataLocal = this.getUserData()
        const find = userDataLocal.find((element) => element.email === login)

        if (login !== find?.email) {
            const newUser = {
                id: this.createUserId(),
                email: login,
                password
            }

            userDataLocal.unshift(newUser)
            localStorage.setItem('userDataStorage', JSON.stringify(userDataLocal))
        }
        console.log('userData', userDataLocal)
    }

    getUserData(): User[] {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('userDataStorage') ?? '[]');
        } else {
            return [];
        }
    }

}