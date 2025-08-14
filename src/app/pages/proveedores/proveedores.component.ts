import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores.service';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorForm: FormGroup;
  selectedProveedor: Proveedor | null = null;
  loading = false;
  error: string | null = null;
  isModalOpen = false;
  modalTitle = 'Nuevo Proveedor';

  constructor(
    private proveedoresService: ProveedoresService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo_electronico: ['', [Validators.email]],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.loading = true;
    this.proveedoresService.getProveedores()
      .subscribe({
        next: (proveedores) => {
          this.proveedores = proveedores;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  createProveedor(): void {
    if (this.proveedorForm.valid) {
      const proveedor = this.proveedorForm.value;
      this.proveedoresService.createProveedor(proveedor)
        .subscribe({
          next: (newProveedor) => {
            this.proveedores.push(newProveedor);
            this.proveedorForm.reset();
            this.selectedProveedor = null;
            this.isModalOpen = false;
            this.error = null;
          },
          error: (error) => {
            this.error = 'Error al crear el proveedor. Por favor, intenta nuevamente.';
            console.error('Error al crear proveedor:', error);
          }
        });
    }
  }

  updateProveedor(): void {
    if (this.proveedorForm.valid && this.selectedProveedor) {
      const proveedor = this.proveedorForm.value;
      this.proveedoresService.updateProveedor(this.selectedProveedor.id, proveedor)
        .subscribe({
          next: (updatedProveedor) => {
            const index = this.proveedores.findIndex(p => p.id === updatedProveedor.id);
            if (index !== -1) {
              this.proveedores[index] = updatedProveedor;
            }
            this.proveedorForm.reset();
            this.selectedProveedor = null;
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    }
  }

  deleteProveedor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedoresService.deleteProveedor(id)
        .subscribe({
          next: () => {
            this.proveedores = this.proveedores.filter(p => p.id !== id);
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    }
  }

  selectProveedor(proveedor: Proveedor): void {
    this.selectedProveedor = proveedor;
    this.proveedorForm.patchValue(proveedor);
  }

  cancelEdit(): void {
    this.selectedProveedor = null;
    this.proveedorForm.reset();
  }

  viewProductos(id: number): void {
    this.router.navigate(['/proveedores/productos', id]);
  }

  viewCompras(id: number): void {
    this.router.navigate(['/proveedores/compras', id]);
  }
}
