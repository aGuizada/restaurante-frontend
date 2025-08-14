import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {
  categorias: Categoria[] = [];
  showModal = false;
  editing = false;
  selectedCategoria?: Categoria;
  categoriaForm = new FormBuilder().group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  openModal(categoria?: Categoria) {
    this.showModal = true;
    this.editing = !!categoria;
    this.selectedCategoria = categoria;
    
    if (categoria) {
      this.categoriaForm.patchValue({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion
      });
    } else {
      this.categoriaForm.reset();
    }
  }

  onSubmit() {
    if (this.categoriaForm.invalid) return;

    const formData = {
      nombre: this.categoriaForm.value.nombre,
      descripcion: this.categoriaForm.value.descripcion
    } as Omit<Categoria, 'id'>;

    if (this.editing && this.selectedCategoria?.id) {
      this.categoriaService.updateCategoria(this.selectedCategoria.id, formData).subscribe(() => {
        this.loadCategorias();
        this.showModal = false;
      });
    } else {
      this.categoriaService.createCategoria(formData).subscribe(() => {
        this.loadCategorias();
        this.showModal = false;
      });
    }
  }

  deleteCategoria(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }
}
        
 