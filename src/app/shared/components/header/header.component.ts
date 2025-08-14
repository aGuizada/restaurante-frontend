import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  @Input() isSidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  currentPage = 'Dashboard';
  userAvatar = 'https://ui-avatars.com/api/?name=Admin+User';
  userName = 'Admin User';
  userRole = 'Administrador';
  
  notifications = [
    { id: 1, message: 'Nuevo pedido recibido', type: 'info' },
    { id: 2, message: 'Stock bajo en productos', type: 'warning' },
  ];

  isUserMenuOpen = false;

  constructor(private router: Router) {}

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  goToPerfil(): void {
    // Navigate to perfil page
    this.router.navigate(['/perfil']);
    this.isUserMenuOpen = false; // Close menu after navigation
  }

  logout(): void {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
