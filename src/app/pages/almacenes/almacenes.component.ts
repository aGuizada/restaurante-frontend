import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { Almacen } from '../../interfaces/almacen.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-almacenes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.scss']
})
export class AlmacenesComponent implements OnInit {
  almacenes: Almacen[] = [];
  almacenForm: FormGroup;
  selectedAlmacen: Almacen | null = null;
  loading = false;
  error: string | null = null;
  isModalOpen = false;
  modalTitle = 'Nuevo Almacen';

  constructor(
    private almacenService: AlmacenService,
    private fb: FormBuilder
  ) {
    this.almacenForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAlmacenes();
  }

  loadAlmacenes(): void {
    this.loading = true;
    this.almacenService.getAlmacenes()
      .subscribe({
        next: (almacenes) => {
          this.almacenes = almacenes;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  createAlmacen(): void {
    if (this.almacenForm.valid) {
      const almacen = this.almacenForm.value;
      this.almacenService.createAlmacen(almacen)
        .subscribe({
          next: (newAlmacen) => {
            this.almacenes.push(newAlmacen);
            this.almacenForm.reset();
            this.selectedAlmacen = null;
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    }
  }

  updateAlmacen(): void {
    if (this.almacenForm.valid && this.selectedAlmacen) {
      const almacen = this.almacenForm.value;
      this.almacenService.updateAlmacen(this.selectedAlmacen.id, almacen)
        .subscribe({
          next: (updatedAlmacen) => {
            const index = this.almacenes.findIndex(a => a.id === updatedAlmacen.id);
            if (index !== -1) {
              this.almacenes[index] = updatedAlmacen;
            }
            this.almacenForm.reset();
            this.selectedAlmacen = null;
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    }
  }

  deleteAlmacen(id: number): void {
    if (confirm('¿Estás seguro de eliminar este almacen?')) {
      this.almacenService.deleteAlmacen(id)
        .subscribe({
          next: () => {
            this.almacenes = this.almacenes.filter(a => a.id !== id);
          },
          error: (error) => {
            this.error = error.message;
          }
        });
    }
  }

  selectAlmacen(almacen: Almacen): void {
    this.selectedAlmacen = almacen;
    this.almacenForm.patchValue(almacen);
  }

  cancelEdit(): void {
    this.selectedAlmacen = null;
    this.almacenForm.reset();
  }
}
