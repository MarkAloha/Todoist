import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterModule, RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../domain/types';

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
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  loginForm: FormGroup

  constructor(
    private userService: UserService, 
    public ref: DynamicDialogRef,
    private router: Router,
    private authService: AuthService) {

    this.loginForm = new FormGroup<LoginForm>({

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )])
    })
  }

  checkFilled() {    
    const login = this.loginForm.value.email
    const password = this.loginForm.value.password
    const inputLogin = document.querySelector('#inputLogin')
    const inputPassword = document.querySelector('#inputPassword')
   
    this.authService.checkFilled(login,password,inputLogin,inputPassword)    
  }

  addUser() {
    const login = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.userService.addUser(login, password)
    this.router.navigate(['/login'])
  }

}
