import { Injectable } from '@angular/core'

@Injectable ({
    providedIn: 'root'
})

export class ProductService {
    
    getProductsData() {
        return [
            {id:'1', 
            name: 'поиграть в доту',        
            },
            {id:'2', 
            name: 'тренировка',        
            },
            {id:'3', 
            name: 'поспать',        
            },
            {id:'4', 
            name: 'поесть',        
            },
        ]
    }

    getProductsMini() {
        return Promise.resolve(this. getProductsData().slice(0,5))
    }
}