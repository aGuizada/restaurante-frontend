import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoriesComponent } from '../../shared/components/categories/categories.component';
import { Producto } from '../../interfaces/producto.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CategoriesComponent],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  products: Producto[] = [];
  allProducts: Producto[] = [];
  selectedCategoryId: number | null = null;
  loading = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        // Filtrar solo productos activos
        this.allProducts = productos.filter(p => p.estado === 'Activo');
        this.products = [...this.allProducts];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  handleAddToCart(product: Producto): void {
    console.log('Producto agregado al carrito:', product);
    // TODO: Implementar lógica de carrito de compras
    // Aquí puedes agregar el producto al servicio de carrito
  }

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    
    if (categoryId === null) {
      // Mostrar todos los productos
      this.products = [...this.allProducts];
    } else {
      // Filtrar productos por categoría
      this.products = this.allProducts.filter(product => 
        product.categoria_id === categoryId
      );
    }
    
    console.log('Categoría seleccionada:', categoryId);
    console.log('Productos filtrados:', this.products.length);
  }

  trackByProductId(index: number, product: Producto): number {
    return product.id;
  }
}
