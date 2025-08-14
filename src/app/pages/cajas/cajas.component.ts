import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss']
})
export class CajasComponent implements OnInit {
  cajaForm!: FormGroup;
  showModal = false;
  modalType: 'nueva' | 'editar' = 'nueva';
  selectedCaja: any = null;
  cajas: any[] = [];
  filteredCajas: any[] = [];

  // Datos simulados para desarrollo
  totalVentas = 5000;
  efectivo = 2000;
  tarjeta = 3000;
  cambio = 500;

  constructor(private fb: FormBuilder) {
    this.cajaForm = this.fb.group({
      numero_caja: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      efectivo_inicial: [0, [Validators.required, Validators.min(0)]],
      estado: ['Abierta', Validators.required]
    });
    this.loadCajas();
  }

  ngOnInit() {
  }

  loadCajas() {
    this.cajas = [
      {
        id_caja: 1,
        numero_caja: 1,
        descripcion: 'Caja Principal',
        efectivo_inicial: 1000,
        estado: 'Abierta'
      },
      {
        id_caja: 2,
        numero_caja: 2,
        descripcion: 'Caja Secundaria',
        efectivo_inicial: 500,
        estado: 'Cerrada'
      }
    ];
    this.filteredCajas = [...this.cajas];
  }

  refreshFinancial() {
    // Simulamos una actualización de datos
    this.totalVentas = Math.floor(Math.random() * 10000) + 5000;
    this.efectivo = Math.floor(Math.random() * 5000) + 1000;
    this.tarjeta = this.totalVentas - this.efectivo;
    this.cambio = Math.floor(Math.random() * 1000) + 500;
  }

  searchCajas(searchTerm: string) {
    if (!searchTerm) {
      this.filteredCajas = [...this.cajas];
      return;
    }

    this.filteredCajas = this.cajas.filter(caja => 
      caja.numero_caja.toString().includes(searchTerm) ||
      caja.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  openModal(type: 'nueva' | 'editar', caja?: any) {
    this.modalType = type;
    this.showModal = true;

    if (type === 'editar' && caja) {
      this.selectedCaja = caja;
      this.cajaForm.patchValue({
        numero_caja: caja.numero_caja,
        descripcion: caja.descripcion,
        efectivo_inicial: caja.efectivo_inicial,
        estado: caja.estado
      });
    } else {
      this.selectedCaja = null;
      this.cajaForm.reset({
        estado: 'Abierta'
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedCaja = null;
    this.cajaForm.reset({
      estado: 'Abierta'
    });
  }

  onSubmit() {
    if (this.cajaForm.valid) {
      const caja = this.cajaForm.value;
      
      if (this.modalType === 'nueva') {
        caja.id_caja = this.cajas.length + 1;
        this.cajas.push(caja);
        this.filteredCajas = [...this.cajas];
      } else if (this.selectedCaja) {
        const index = this.cajas.findIndex(c => c.id_caja === this.selectedCaja.id_caja);
        if (index !== -1) {
          this.cajas[index] = caja;
          this.filteredCajas[index] = caja;
        }
      }

      this.closeModal();
    }
  }

  deleteCaja(id: number) {
    const index = this.cajas.findIndex(c => c.id_caja === id);
    if (index !== -1) {
      this.cajas.splice(index, 1);
      this.filteredCajas = [...this.cajas];
    }
  }
}
