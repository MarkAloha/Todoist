import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterModule, RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  standalone: true,
  providers: [
    UserService,
    DynamicDialogConfig,
    DynamicDialogRef,
    RouterModule,
    Router],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  loginForm: FormGroup

  constructor(private userService: UserService, public ref: DynamicDialogRef) {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )])
    })
  }

  addUser() {
    const login = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.userService.addUser(login, password)
  }

}
