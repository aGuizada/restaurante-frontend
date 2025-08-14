import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <!-- Layout principal con header y sidebar -->
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- Header -->
      <app-header></app-header>

      <div class="flex flex-1">
        <!-- Sidebar -->
        <app-sidebar class="w-64 bg-white border-r border-gray-200 hidden md:block"></app-sidebar>

        <!-- Contenido principal -->
        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
