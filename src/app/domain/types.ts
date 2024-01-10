import { FormControl } from "@angular/forms";

export interface Task {
    id: number;
    date: string ;
    name: string;
    description: string;
    category: string;
    status: boolean;
    userId: number;
    priority: number;
}

export interface MiniTask {
    name: string,
    date: string,
    description: string;
    category: string;
    priority: number;
}

export interface Class {
    name: string;
    id: number;
    userId: number
}

export interface User {
    email: string;
    password: string;
    id: number

}

export interface LoginForm {
    email: FormControl;
    password: FormControl;
}

export interface CreateChangeForm {
    date: any;
    inputClass: any;
    nameTask: any;
    description: any;
}