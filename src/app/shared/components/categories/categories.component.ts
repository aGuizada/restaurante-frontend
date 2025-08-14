import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Output() categorySelected = new EventEmitter<string>();

  categories: Category[] = [
    { id: 'all', name: 'Todos', icon: 'restaurant_menu' },
    { id: 'burgers', name: 'Hamburguesas', icon: 'lunch_dining' },
    { id: 'pizzas', name: 'Pizzas', icon: 'local_pizza' },
    { id: 'drinks', name: 'Bebidas', icon: 'local_bar' },
    { id: 'desserts', name: 'Postres', icon: 'icecream' }
  ];

  activeCategory: string = 'all';

  selectCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.categorySelected.emit(categoryId);
  }
}
