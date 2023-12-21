export interface Task {
    id?: number;
    data?: string;
    name?: string;
    description?: string;
    category?: string;
    status?: string;
    userId: number;
}

export interface Class {
    id: number;
    name: string;
    done?: any
}

export interface User {
    email: string;
    password: string;
    id: number

}