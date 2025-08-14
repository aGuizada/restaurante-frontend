import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { CajasComponent } from './pages/cajas/cajas.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
    UsuariosComponent,
    ProductosComponent,
    InventarioComponent,
    CajasComponent,
    ProveedoresComponent,
    ComprasComponent,
    ClientesComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
