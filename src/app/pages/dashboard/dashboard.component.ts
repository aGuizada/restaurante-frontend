import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface DashboardStats {
  totalVentas: number;
  totalIngresos: number;
  productosEnStock: number;
  clientesActivos: number;
}

interface ChartData {
  labels: string[];
  datasets: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalVentas: 1250,
    totalIngresos: 15000,
    productosEnStock: 250,
    clientesActivos: 150
  };

  // Sales performance chart
  // Sales Performance Chart Data
  salesChart: ChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ventas Totales',
        data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
        borderColor: '#4F46E5',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.1)'
      }
    ]
  };

  // Category Distribution Chart Data
  categoryChart: ChartData = {
    labels: ['Almuerzos', 'Cenas', 'Bebidas', 'Postres', 'Aperitivos'],
    datasets: [
      {
        data: [25, 20, 15, 10, 30],
        backgroundColor: [
          '#4F46E5',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ]
      }
    ]
  };

  // Top Products Chart Data
  topProductsChart: ChartData = {
    labels: ['Plato 1', 'Plato 2', 'Plato 3', 'Plato 4', 'Plato 5'],
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: [250, 180, 200, 150, 120],
        backgroundColor: '#10B981',
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };

  recentActivity: any[] = [
    { icon: 'fas fa-shopping-cart', title: 'Nueva Venta', description: 'Venta #12345', time: 'Hace 15 min' },
    { icon: 'fas fa-box', title: 'Nuevo Producto', description: 'Producto #67890', time: 'Hace 30 min' },
    { icon: 'fas fa-user', title: 'Nuevo Cliente', description: 'Cliente #11223', time: 'Hace 45 min' },
    { icon: 'fas fa-file-invoice', title: 'Nueva Factura', description: 'Factura #45678', time: 'Hace 1h' }
  ];

  quickActions: any[] = [
    { icon: 'fas fa-shopping-cart', title: 'Nueva Venta', route: '/ventas' },
    { icon: 'fas fa-box', title: 'Nuevo Producto', route: '/productos' },
    { icon: 'fas fa-user', title: 'Nuevo Cliente', route: '/clientes' },
    { icon: 'fas fa-file-invoice', title: 'Nueva Factura', route: '/ventas/facturas' }
  ];

  @ViewChild('salesChart') salesChartRef!: ElementRef;
  @ViewChild('categoryChart') categoryChartRef!: ElementRef;
  @ViewChild('topProductsChart') topProductsChartRef!: ElementRef;

  // Chart configurations
  salesChartConfig: any;
  categoryChartConfig: any;
  topProductsChartConfig: any;

  constructor() {}

  ngOnInit(): void {
    // Initialize Chart.js
    Chart.register(...registerables);

    // Sales Performance Chart
    this.salesChartConfig = {
      type: 'line',
      data: this.salesChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#6B7280'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#6B7280'
            },
            grid: {
              color: '#E5E7EB'
            }
          },
          x: {
            ticks: {
              color: '#6B7280'
            },
            grid: {
              color: '#E5E7EB'
            }
          }
        }
      }
    };

    // Category Distribution Chart
    this.categoryChartConfig = {
      type: 'doughnut',
      data: this.categoryChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#6B7280'
            }
          }
        }
      }
    };

    // Top Products Chart
    this.topProductsChartConfig = {
      type: 'bar',
      data: this.topProductsChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#6B7280'
            },
            grid: {
              color: '#E5E7EB'
            }
          },
          x: {
            ticks: {
              color: '#6B7280'
            },
            grid: {
              color: '#E5E7EB'
            }
          }
        }
      }
    };

    // Simulate loading data
    setTimeout(() => {
      this.stats = {
        totalVentas: 1250,
        totalIngresos: 15000,
        productosEnStock: 250,
        clientesActivos: 150
      };
    }, 1000);
  }
}
