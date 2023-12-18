import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [AuthService, Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponentComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService
    ) {

  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )])
    })
  }

  submitLogin() {
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: () => this.router.navigate (['admin'])
    // })
  }

}
