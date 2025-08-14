import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Role } from '../../interfaces/role.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  selectedUsuario: User | null = null;
  isEditing = false;
  isLoading = false;
  isModalOpen = false;
  searchTerm: string = '';
  form: Partial<User> = {
    name: '',
    email: '',
    password: '',
    role_id: 2
  };
  roles: { id: number; nombre: string }[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService
  ) {
    this.loadRoles();
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
        // Roles por defecto si falla la carga
        this.roles = [
          { id: 1, nombre: 'Administrador' },
          { id: 2, nombre: 'Vendedor' }
        ];
      }
    });
  }

  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.usuarios.forEach(usuario => (usuario as any).selected = isChecked);
  }

  deleteSelected(): void {
    const selectedUsuarios = this.usuarios.filter(usuario => (usuario as any).selected);
    if (selectedUsuarios.length > 0) {
      if (confirm('¿Está seguro de que desea eliminar los usuarios seleccionados?')) {
        selectedUsuarios.forEach(usuario => {
          this.userService.deleteUser(usuario.id!).subscribe({
            next: () => {
              this.loadUsuarios();
            },
            error: (error) => {
              alert('Error al eliminar el usuario');
              console.error(error);
            }
          });
        });
      }
    } else {
      alert('Por favor, seleccione al menos un usuario para eliminar');
    }
  }

  searchUsers(): void {
    if (this.searchTerm) {
      this.usuarios = this.usuarios.filter(usuario => 
        usuario.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadUsuarios();
    }
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.usuarios = response;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Error al cargar los usuarios');
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  openModal(editing: boolean = false, usuario: User | null = null): void {
    this.isEditing = editing;
    this.isModalOpen = true;
    
    if (usuario) {
      this.selectedUsuario = usuario;
      this.form = {
        name: usuario.name || '',
        email: usuario.email || '',
        password: '',
        role_id: usuario.role_id || 2
      };
    } else {
      this.selectedUsuario = null;
      this.form = {
        name: '',
        email: '',
        password: '',
        role_id: 2
      };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.selectedUsuario = null;
    this.form = {
      name: '',
      email: '',
      password: '',
      role_id: 2
    };
  }

  saveUsuario(): void {
    const userToSave: User = {
      name: this.form.name || '',
      email: this.form.email || '',
      password: this.form.password || '',
      role_id: this.form.role_id || 2,
      estado: 'Activo', // Valor por defecto según la migración
      username: this.form.name?.toLowerCase().replace(/\s+/g, '_') // Generar username basado en el nombre
    };

    if (this.isEditing && this.selectedUsuario) {
      userToSave.id = this.selectedUsuario?.id;
      this.userService.updateUser(userToSave.id!, userToSave).subscribe({
        next: () => {
          alert('Usuario actualizado exitosamente');
          this.closeModal();
          this.loadUsuarios();
        },
        error: (error) => {
          alert('Error al actualizar el usuario');
          console.error(error);
        }
      });
    } else {
      this.authService.register(userToSave).subscribe({
        next: (response) => {
          alert('Usuario creado exitosamente');
          this.closeModal();
          this.loadUsuarios();
        },
        error: (error) => {
          alert('Error al crear el usuario');
          console.error(error);
        }
      });
    }
  }

  deleteUsuario(usuario: User): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(usuario.id!).subscribe({
        next: () => {
          alert('Usuario eliminado exitosamente');
          this.loadUsuarios();
        },
        error: (error) => {
          alert('Error al eliminar el usuario');
          console.error(error);
        }
      });
    }
  }

  toggleEstado(usuario: User): void {
    const nuevoEstado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    
    if (confirm(`¿Estás seguro de ${nuevoEstado === 'activo' ? 'activar' : 'desactivar'} este usuario?`)) {
      const userToUpdate: User = {
        id: usuario.id!,
        name: usuario.name,
        email: usuario.email,
        password: '',
        role_id: usuario.role_id,
        estado: nuevoEstado
      };

      this.userService.updateUser(usuario.id!, userToUpdate).subscribe({
        next: () => {
          alert(`Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente`);
          this.loadUsuarios();
        },
        error: (error) => {
          alert('Error al cambiar el estado del usuario');
          console.error(error);
        }
      });
    }
  }

  getRolColor(roleId: number): string {
    return roleId === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  }

  getEstadoColor(estado: string): string {
    return estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getRolNombre(roleId: number): string {
    return this.roles.find(r => r.id === roleId)?.nombre || 'Usuario';
  }
}
