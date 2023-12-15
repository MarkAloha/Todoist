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

export interface Item {
    description: string;
    done: boolean;

}