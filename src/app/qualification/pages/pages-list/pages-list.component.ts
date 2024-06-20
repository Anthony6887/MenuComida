import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { Product } from 'src/app/interfaces/product';
import { PhotoService } from 'src/app/services/photo.service';
import { ProductService } from 'src/app/services/product.service';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'pmc-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent {

  photoSelected: string | ArrayBuffer = ''; // Inicializa la propiedad
  photos: Photo[] = [];
  listProduct: Product[] = [];
  file: File | undefined; // Inicializa la propiedad

  constructor(private _photoService: PhotoService, private router: Router, private _productService: ProductService  ) { }

  ngOnInit() {
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
            window.location.reload();
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
  
}
