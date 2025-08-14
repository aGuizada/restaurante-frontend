import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: 'perfil',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent)
      },
      {
        path: 'productos',
        loadComponent: () => import('./pages/productos/productos.component').then(m => m.ProductosComponent)
      },
      {
        path: 'inventario',
        loadComponent: () => import('./pages/inventario/inventario.component').then(m => m.InventarioComponent)
      },
      {
        path: 'almacenes',
        loadComponent: () => import('./pages/almacenes/almacenes.component').then(m => m.AlmacenesComponent)
      },
      {
        path: 'cajas',
        loadComponent: () => import('./pages/cajas/cajas.component').then(m => m.CajasComponent)
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./pages/proveedores/proveedores.component').then(m => m.ProveedoresComponent)
      },
      {
        path: 'compras',
        loadComponent: () => import('./pages/compras/compras.component').then(m => m.ComprasComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent)
      },
      {
        path: 'ventas',
        loadComponent: () => import('./pages/ventas/ventas.component').then(m => m.VentasComponent)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./pages/categorias/categorias.component').then(m => m.CategoriasComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];