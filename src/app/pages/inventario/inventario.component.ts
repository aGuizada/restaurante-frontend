import { Component, OnInit } from '@angular/core';

interface InventoryItem {
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: []
})
export class InventarioComponent implements OnInit {
  showModal = false;
  editingItem = false;
  searchTerm = '';
  inventory: InventoryItem[] = [
    {
      codigo: 'P001',
      nombre: 'Tomates',
      categoria: 'Verduras',
      stock: 100,
      precio: 0.5
    },
    {
      codigo: 'P002',
      nombre: 'Leche',
      categoria: 'Lácteos',
      stock: 50,
      precio: 2.5
    }
  ];
  filteredInventory: InventoryItem[] = [];
  newItem: InventoryItem = {
    codigo: '',
    nombre: '',
    categoria: '',
    stock: 0,
    precio: 0
  };

  constructor() {
    // Add global functions to component
    this.parseInt = parseInt;
    this.parseFloat = parseFloat;
  }

  ngOnInit(): void {
    this.filteredInventory = [...this.inventory];
  }

  openAddModal() {
    this.editingItem = false;
    this.newItem = {
      codigo: '',
      nombre: '',
      categoria: '',
      stock: 0,
      precio: 0
    };
    this.showModal = true;
  }

  editItem(item: InventoryItem) {
    this.editingItem = true;
    this.newItem = { ...item };
    this.showModal = true;
  }

  deleteItem(item: InventoryItem) {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.inventory = this.inventory.filter(i => i !== item);
      this.filteredInventory = this.inventory;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  saveItem() {
    if (this.newItem.codigo && this.newItem.nombre && this.newItem.categoria) {
      if (this.editingItem) {
        const index = this.inventory.findIndex(i => i.codigo === this.newItem.codigo);
        if (index !== -1) {
          this.inventory[index] = { ...this.newItem };
        }
      } else {
        this.inventory.push({ ...this.newItem });
      }
      this.filteredInventory = [...this.inventory];
      this.closeModal();
    }
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filteredInventory = this.inventory.filter(item =>
      item.codigo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Global functions
  parseInt: (value: string) => number = parseInt;
  parseFloat: (value: string) => number = parseFloat;

  // Event handlers
  onInputChange(event: Event, field: keyof InventoryItem) {
    const target = event.target as HTMLInputElement;
    // Only allow string fields to be updated
    if (field === 'codigo' || field === 'nombre' || field === 'categoria') {
      this.newItem[field] = target.value;
    }
  }

  onNumberInputChange(event: Event, field: 'stock' | 'precio') {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // Convert to number using appropriate function
    this.newItem[field] = this[field === 'stock' ? 'parseInt' : 'parseFloat'](value);
  }
}
