export interface Task {
    id?: number;
    data?: string;
    name?: string;
    description?: string;
    category?: string;
    status?: string;
}

export interface Class {
    id: number;
    name: string;
    done?: any
}

export interface User {
    login: string;
    password: string;
    id?: number

}