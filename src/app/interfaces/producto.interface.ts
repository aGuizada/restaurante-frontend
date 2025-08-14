export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precio_venta: number;
  categoria_id: number;
  proveedor_id?: number;
  estado: 'Activo' | 'Inactivo';
  imagen?: string;
  requiere_inventario: boolean;
  created_at: string;
  updated_at: string;
  categoria?: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  proveedor?: {
    id: number;
    nombre: string;
    ruc: string;
  };
  inventario?: {
    id: number;
    cantidad: number;
    producto_id: number;
  };
  detallesCompras?: Array<{
    id: number;
    compra_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }>;
  detallesVentas?: Array<{
    id: number;
    venta_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }>;
}
