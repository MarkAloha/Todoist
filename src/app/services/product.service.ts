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
        inventoryStatus: 'LOWSTOCK'
      },
      { id: '2', name: 'тренировка', code: '2142142', description: 'ноги', inventoryStatus: 'LOWSTOCK' },
      { id: '3', name: 'поспать', code: '12442', description: 'сон', inventoryStatus: 'INSTOCK' },
      { id: '4', name: 'поесть', code: '4124142', description: 'еду', inventoryStatus: 'OUTOFSTOCK' },
    ];
  }

  getProductsWithOrdersData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: [
          {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            quantity: 1,
            customer: 'David James',
            status: 'PENDING',
          },
          {
            id: '1000-1',
            productCode: 'f230fh0g3',
            date: '2020-05-14',
            amount: 130,
            quantity: 2,
            customer: 'Leon Rodrigues',
            status: 'DELIVERED',
          },
          {
            id: '1000-2',
            productCode: 'f230fh0g3',
            date: '2019-01-04',
            amount: 65,
            quantity: 1,
            customer: 'Juan Alejandro',
            status: 'RETURNED',
          },
          {
            id: '1000-3',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 195,
            quantity: 3,
            customer: 'Claire Morrow',
            status: 'CANCELLED',
          },
        ],
      },
    ];
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
