import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  userAvatar = 'https://ui-avatars.com/api/?name=Admin+User';
  userName = 'Admin User';
  userRole = 'Administrador';

  menuGestion: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'point_of_sale', label: 'Ventas', route: '/ventas' },
    { icon: 'restaurant_menu', label: 'Productos', route: '/productos' },
    { icon: 'category', label: 'Categorías', route: '/categorias' },
    { icon: 'inventory', label: 'Inventario', route: '/inventario' },
    { icon: 'warehouse', label: 'Almacenes', route: '/almacenes' },
    { icon: 'people', label: 'Usuarios', route: '/usuarios' },
    { icon: 'shopping_cart', label: 'Compras', route: '/compras' }
  ];

  menuAdmin: MenuItem[] = [
    { icon: 'people', label: 'Clientes', route: '/clientes' },
    { icon: 'account_balance', label: 'Cajas', route: '/cajas' },
    { icon: 'business', label: 'Proveedores', route: '/proveedores' }
  ];
}
