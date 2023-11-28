import { Injectable } from '@angular/core'

@Injectable ({
    providedIn: 'root'
})

export class ProductService {
    
    getProductsData() {
        return [
            {id:'1', 
            name: 'поиграть в доту',  
            code: '1142142',
            description: 'последний раз'     
            },
            {id:'2', 
            name: 'тренировка',     
            code: '2142142',
            description: 'ноги'  
            },
            {id:'3', 
            name: 'поспать',    
            code: '12442',
            description: 'сон' 
            },
            {id:'4', 
            name: 'поесть',      
            code: '4124142' ,
            description: 'еду'
            },
        ]
    }

    getProductsMini() {
        return Promise.resolve(this. getProductsData().slice(0,5))
    }
}