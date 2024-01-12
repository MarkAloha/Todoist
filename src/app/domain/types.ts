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
    email: FormControl <string | null>;
    password: FormControl <string | null>;
}
export interface SearchForm {
    name: FormControl <string | null>;
    category: FormControl <string | null>;
    description: FormControl<string | null>;
    date: FormControl<Date | null>;
}

export interface CreateChangeForm {
    date: FormControl<Date | null>;
    inputClass: FormControl<string | null>;
    nameTask: FormControl<string | null>;
    description: FormControl<string | null>;
}

export interface DivBlock {
    nativeElement: object;
}

export interface FormSearch {
    name: string | null | undefined;
    category: string | null | undefined;
    description: string | null | undefined;
    date: Date | null | undefined;
}
