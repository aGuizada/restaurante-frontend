export const environment = {
  production: false,
  apiUrl: 'http://localhost:80/api',
  apiEndpoints: {
    auth: {
      login: '/login',
      register: '/register',
      logout: '/logout',
      user: '/user'
    },
    roles: '/roles',
    users: '/users',
    cajas: '/cajas',
    categorias: '/categorias',
    productos: '/productos',
    inventario: '/inventario',
    clientes: '/clientes',
    tiposServicio: '/tipos-servicio',
    ventas: '/ventas',
    detallesVentas: '/detalles-ventas',
    movimientosCaja: '/movimientos-caja'
  }
};
