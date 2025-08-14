import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  proveedores: any[] = [];
  showModal = false;
  editing = false;
  selectedProducto: Producto | undefined;
  productoForm!: FormGroup;
  imagenUrl: string | undefined;
  imagenFile: File | undefined;
  selectedFile: File | undefined;

  constructor(
    private productosService: ProductosService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', []],
      precio_venta: [0, [Validators.required, Validators.min(0)]],
      categoria_id: [0, [Validators.required]],
      proveedor_id: [null, []],
      imagen: [''],
      requiere_inventario: [false, [Validators.required]]
    }, {
      updateOn: 'change' // Actualizar el formulario inmediatamente cuando cambie el valor
    });
  }

  ngOnInit() {
    this.loadProductos();
    this.loadCategorias();
    this.loadProveedores();
    this.onFileSelected = this.onFileSelected.bind(this);
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  loadProveedores() {
    this.proveedorService.getProveedores().subscribe((proveedores: any[]) => {
      this.proveedores = proveedores;
    });
  }

  loadProductos() {
    this.productosService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  openModal(producto?: Producto) {
    this.showModal = true;
    this.editing = !!producto;
    this.selectedProducto = producto;
    
    if (producto) {
      this.productoForm.patchValue({
        codigo: producto.codigo,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio_venta: producto.precio_venta,
        categoria_id: producto.categoria_id,
        proveedor_id: producto.proveedor_id,
        imagen: producto.imagen,
        requiere_inventario: Boolean(producto.requiere_inventario)
      });
    } else {
      this.productoForm.reset();
      this.productoForm.patchValue({
        precio_venta: 0,
        categoria_id: 0,
        requiere_inventario: false
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenUrl = URL.createObjectURL(file);
      this.imagenFile = file;
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.productoForm.invalid) {
      return;
    }

    const productoData = this.productoForm.value as Omit<Producto, 'id' | 'created_at' | 'updated_at'>;
    productoData.estado = 'Activo';
    // Convertir explícitamente a booleano y asegurar que sea un valor booleano
    const requiereInventario = this.productoForm.get('requiere_inventario')?.value;
    productoData.requiere_inventario = Boolean(requiereInventario);
    const imagen = this.selectedFile;

    try {
      const action = this.editing && this.selectedProducto 
        ? this.productosService.updateProducto(this.selectedProducto!.id, productoData, imagen)
        : this.productosService.createProducto(productoData, imagen);

      action.subscribe(() => {
        this.showModal = false;
        this.loadProductos();
        // Reset form and image state
        this.productoForm.reset();
        this.imagenUrl = undefined;
        this.imagenFile = undefined;
        this.selectedFile = undefined;
      }, error => {
        console.error('Error:', error);
        alert('Error al procesar el producto');
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el producto');
    }
  }

  deleteProducto(producto: Producto) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      if (producto && producto.id) {
        this.productosService.deleteProducto(producto.id).subscribe(() => {
          this.loadProductos();
        });
      }
    }
  }
}

