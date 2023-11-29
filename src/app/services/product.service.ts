import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductsData() {
    return [
      {
        id: '1',
        name: 'поиграть в доту',
        code: '1142142',
        description: 'последний раз',
        inventoryStatus: 'Выполнено'
      },
      { id: '2', name: 'тренировка', code: '2142142', description: 'ноги', inventoryStatus: 'В процессе' },
      { id: '3', name: 'поспать', code: '12442', description: 'сон', inventoryStatus: 'Выполнено' },
      { id: '4', name: 'поесть', code: '4124142', description: 'еду', inventoryStatus: 'Выполнено' },
    ];
  }

  getProductsWithOrdersData() {
    return [];
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  }

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  }
}
