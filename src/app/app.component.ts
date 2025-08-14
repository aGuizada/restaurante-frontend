import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent, AuthLayoutComponent],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'restaurante-app';
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
