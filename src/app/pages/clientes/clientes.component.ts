import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  selectedCliente: Cliente | null = null;
  loading = false;
  error: string | null = null;
  isModalOpen = false;
  modalTitle = 'Nuevo Cliente';

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo_electronico: ['', [Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    this.clientesService.getClientes()
      .subscribe({
        next: (clientes: Cliente[]) => {
          this.clientes = clientes;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  createCliente(): void {
    if (this.clienteForm.valid) {
      const cliente = this.clienteForm.value;
      this.clientesService.createCliente(cliente)
        .subscribe({
          next: (newCliente: Cliente) => {
            this.clientes.push(newCliente);
            this.clienteForm.reset();
            this.selectedCliente = null;
            this.isModalOpen = false;
            this.error = null;
          },
          error: (error: any) => {
            this.error = 'Error al crear el cliente. Por favor, intenta nuevamente.';
            console.error('Error al crear cliente:', error);
          }
        });
    }
  }

  updateCliente(): void {
    if (this.clienteForm.valid && this.selectedCliente) {
      const cliente = this.clienteForm.value;
      this.clientesService.updateCliente(this.selectedCliente.id, cliente)
        .subscribe({
          next: (updatedCliente: Cliente) => {
            const index = this.clientes.findIndex(c => c.id === updatedCliente.id);
            if (index !== -1) {
              this.clientes[index] = updatedCliente;
            }
            this.clienteForm.reset();
            this.selectedCliente = null;
            this.isModalOpen = false;
          },
          error: (error: any) => {
            this.error = 'Error al actualizar el cliente. Por favor, intenta nuevamente.';
            console.error('Error al actualizar cliente:', error);
          }
        });
    }
  }

  deleteCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clientesService.deleteCliente(id)
        .subscribe({
          next: () => {
            this.clientes = this.clientes.filter(c => c.id !== id);
          },
          error: (error: any) => {
            this.error = 'Error al eliminar el cliente. Por favor, intenta nuevamente.';
            console.error('Error al eliminar cliente:', error);
          }
        });
    }
  }

  selectCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.clienteForm.patchValue(cliente);
    this.modalTitle = 'Editar Cliente';
    this.isModalOpen = true;
  }

  searchClientes(searchTerm: string): void {
    if (!searchTerm) {
      this.clientes = [...this.clientes];
      return;
    }

    this.clientes = this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.correo_electronico?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
      (cliente.telefono?.includes(searchTerm) ?? false)
    );
  }

  openModal(): void {
    this.modalTitle = 'Nuevo Cliente';
    this.selectedCliente = null;
    this.clienteForm.reset();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.clienteForm.reset();
    this.selectedCliente = null;
  }
}


