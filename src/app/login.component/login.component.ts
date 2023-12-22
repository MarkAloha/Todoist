import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService
    ) {

  }

  submitLogin() {
    console.log(this.loginForm.value)

    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate (['/']),
      error: (err) => alert(err.message)
      
      
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )])
    })

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  

}
