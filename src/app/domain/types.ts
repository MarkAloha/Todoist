import { FormControl } from "@angular/forms";

export interface Task {
    id?: number;
    data?: any;
    name?: string;
    description?: string;
    category?: string;
    status: boolean;
    userId: number;
}

export interface Class {
    id: number;
    name: string;
    done?: any;
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