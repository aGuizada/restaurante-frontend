// Importamos la interfaz Producto existente
import { Producto } from '../../interfaces/producto.interface';

// Extendemos la interfaz Producto para agregar campos de compatibilidad
export interface Product extends Producto {
  name?: string; // Campo opcional para compatibilidad
  price?: number; // Campo opcional para compatibilidad
  image?: string; // Campo opcional para compatibilidad
  category?: string; // Campo opcional para compatibilidad
  rating?: number; // Campo opcional para compatibilidad
}