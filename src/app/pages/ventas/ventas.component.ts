import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoriesComponent } from '../../shared/components/categories/categories.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CategoriesComponent],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Hamburguesa Clásica',
      price: 9.99,
      image: 'assets/products/hamburger.jpg',
      rating: 5,
      category: 'Hamburguesas'
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      price: 12.99,
      image: './assets/productos/pizza.jpg',
      rating: 4,
      category: 'Pizzas'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes cargar los productos desde un servicio
  }

  handleAddToCart(product: Product): void {
    console.log('Producto agregado:', product);
    // Implementar lógica de agregar al carrito
  }

  onCategorySelected(categoryId: string): void {
    console.log('Categoría seleccionada:', categoryId);
    // Implementar filtrado por categoría
  }
}
