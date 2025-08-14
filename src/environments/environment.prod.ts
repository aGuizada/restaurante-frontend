export const environment = {
  production: true,
  apiUrl: 'http://localhost/api',
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
