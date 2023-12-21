import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [AuthService],
  imports: [
    CommonModule,
    ButtonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  logout() {
    this.authService.logout(),
    this.router.navigate(['/login'])
  }
}
