import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
export class AuthLayoutComponent {}
