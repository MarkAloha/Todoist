import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-authorization',
  standalone: true,
  providers: [UserService,DynamicDialogConfig, DynamicDialogRef],
  imports: [CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  constructor(private userService: UserService, public ref: DynamicDialogRef, private el: ElementRef, ){

  }

  addUser(login:string, password:string) {
      this.userService.addUser(login, password)
  }

}
