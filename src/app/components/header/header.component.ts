import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit{

  loginActiveUser: string | null = null

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.loginActiveUser = this.authService.getLoginActiveUser()
  }

  logout() {
    this.authService.logout(),
      this.router.navigate(['/login'])
  }
}
