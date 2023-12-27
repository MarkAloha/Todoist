import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginForm } from '../domain/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
     
  ],
  providers: [AuthService, Router, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription!: Subscription ;
  loginForm!: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  submitLogin() {
    this.subscription = this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert(err.message)
    })

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginForm>({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )])
    })

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe()
    }
  }
}
