import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'
import { TableComponent } from './table/table.component';
import { TaskService } from './services/task.service';
import { RegistrationComponent } from './registration.component/registration.component';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-root',
  standalone: true,
  providers: [TaskService, Router, TranslateService, PrimeNGConfig],
  imports: [CommonModule,
    RouterOutlet,
    NgFor,
    FormsModule,
    TableModule,
    TableComponent,
    RegistrationComponent,
    RouterModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})



export class AppComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    
  ) { }

  ngOnInit() {      
   
  }

}
