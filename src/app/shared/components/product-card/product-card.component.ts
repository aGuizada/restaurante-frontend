import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    // No agregar si el producto está inactivo
    if (this.product.estado === 'Inactivo') {
      return;
    }
    this.addToCart.emit(this.product);
  }

  getProductName(): string {
    return this.product.nombre || this.product.name || 'Sin nombre';
  }

  getProductPrice(): number {
    return this.product.precio_venta || this.product.price || 0;
  }

  getProductImage(): string {
    return this.product.imagen_url || this.product.image || 'assets/images/no-image.png';
  }

  getProductCategory(): string {
    return this.product.categoria?.nombre || this.product.category || 'Sin categoría';
  }
}
