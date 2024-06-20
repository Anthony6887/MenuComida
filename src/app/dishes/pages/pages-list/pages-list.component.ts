import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo';



@Component({
  selector: 'pmc-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent implements OnInit {

  listProduct: Product[] = [];
  archivos: any = [];
  imagenes: any[] = [];
  previsualizar: string = '';
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  imageSrc: string = '';
  filtro: string = '';
  editing: boolean = false;
  selectedUserId: number | null = null;
  photoSelected: string | ArrayBuffer = ''; // Inicializa la propiedad
  photos: Photo[] = [];
  file: File | undefined;
  constructor(private _productService: ProductService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private _photoService: PhotoService,
    private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      titulo: ['', Validators.required],
      selectedPhoto: [null, Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      rating: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }


  ngOnInit(): void {
    this.getProducts();
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
    this._photoService.getPhotos()
      .subscribe({
        next: (res: Photo[]) => {
          this.photos = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    });
  }

  getProduct(id: number) {

    this._productService.getProduct(id).subscribe((data: Product) => {

      this.form.setValue({
        id: data.id,
        name: data.name,
        description: data.description,
        titulo: data.titulo,
        pricio: data.precio,
        cantidad: data.cantidad
      })
    })
  }
  startEditing(id: number) {
    this.editing = true;
    this.selectedUserId = id;

    const selectedUser = this.listProduct.find(product => product.id === id);

    if (selectedUser) {
      this.form.patchValue(selectedUser);
    }
  }

  onSave() {
    if (this.editing) {
      this.updateProduct(this.selectedUserId!); // "!" para indicar que no es nulo
      console.log("editar")
    } else {
      this.addProduct();
      console.log("agregar")
    }
  }

  addProduct() {

    const selectedPhotoId = +this.form.value.selectedPhoto;
    const selectedPhoto = this.photos.find(photo => {
      console.log('photo.id:', typeof photo.id, photo.id);
      return photo.id === selectedPhotoId;
    });
    if (this.form.get('rating')) {
      const selectedRating: number = this.form.get('rating')?.value;
      console.log('selectRating:', selectedRating);
    
      // Resto de tu lógica
    

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      titulo: this.form.value.titulo,
      precio: this.form.value.precio,
      cantidad: this.form.value.cantidad,
      image: selectedPhoto?.id, // Valor predeterminado, ajusta según tus necesidades
      rating: selectedRating
    }
    this._productService.saveProduct(product).subscribe(() => {
      this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado');
      this.getProducts();
      window.location.reload()
    })
  } else {
    console.error('El campo de calificación no está definido en el formulario.');
  }
  }

  updateProduct(id: number) {
    const selectedPhotoId = +this.form.value.selectedPhoto;
    const selectedPhoto = this.photos.find(photo => {
      console.log('photo.id:', typeof photo.id, photo.id);
      return photo.id === selectedPhotoId;
    });
    const selectedRating: number = this.form.get('rating')?.value;

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      titulo: this.form.value.titulo,
      precio: this.form.value.precio,
      cantidad: this.form.value.cantidad,
      image: selectedPhoto?.id, // Valor predeterminado, ajusta según tus necesidades
      rating: selectedRating

    }

    this._productService.updateProduct(id, product).subscribe(() => {
      this.getProducts();
      this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
      window.location.reload()
    })
  }



  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      if (confirm('Estas seguro de eliminar el producto?')) {
        this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado');
      }

    })
  }
  handleSearch(value: string) {
    console.log(value);
  }


  onPhotoSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.file = <File>inputElement.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result || ''; // Asigna un valor por defecto
      reader.readAsDataURL(this.file);
    }
  }


  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    if (this.file) {
      this._photoService
        .createPhoto(title.value, description.value, this.file)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/platos']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('Seleccione un archivo antes de cargarlo.');
    }
    return false;
  }

  getPhotoTitle(photoId: number): string {
    const photo = this.photos.find(p => p.id === photoId);
    return photo ? photo.title : '';
  }


  getPhotoDescription(photoId: number): string {
    const photo = this.photos.find(p => p.id === photoId);
    return photo ? photo.description : '';
  }


}