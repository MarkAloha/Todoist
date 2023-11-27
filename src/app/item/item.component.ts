import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
// import { Item } from '../item'

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, AppComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  item: any = ''

  editable: boolean = false

  // @Input() item: Item;
  // @Input() newItem: string;
  // @Output() remove = new EventEmitter<Item>()

  saveItem(description:any) {
    if(!description) return;
    this.editable = false;
    this.item.description = description;
  }



  

}
