import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ Router ],
  imports: [CommonModule, RouterOutlet, RouterModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent  {
  constructor(
  ) {}  
}
