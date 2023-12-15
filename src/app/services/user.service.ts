import { Injectable } from '@angular/core';
import { User } from '../domain/types';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    createUserId () {
        let idLast: any = localStorage.getItem('idLastUser')
        let idNull = JSON.parse(idLast)
        idNull ??= 3
        const idItem = idNull + 1
        idLast = idItem
        localStorage.setItem('idLastUser', JSON.stringify(idLast))
        return idItem
      }

    addUser(login:string, password:string) {

        const localData = this.getUserData()

        const newUser = {
            id: this.createUserId(),
            login,
            password
        }

        localData.unshift(newUser)
        localStorage.setItem('userDataStorage', JSON.stringify(localData))

        console.log('userData', localData)
    }

    getUserData(): User[] {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('userDataStorage') ?? '[]');
        } else {
            return [];
        }
    }

}