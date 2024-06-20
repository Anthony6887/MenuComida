import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ItemCarrito } from 'src/app/interfaces/ItemCarrito';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'pmc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listProduct: Product[] = [];
  photos: Photo[] = [];
  filtro: string = '';
  constructor(private _productService: ProductService,
   private photoService: PhotoService,
   private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.photoService.getPhotos()
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

  handleSearch(value: string) {
    console.log(value);
  }
  addCarrito(item: Product) {
    let iCarrito: ItemCarrito = {
      id: item.id,
      name: item.name,
      precio: item.precio,
      cantidad: 1
    }
    if (localStorage.getItem('carrito') == null) {
      let carrito: ItemCarrito[] = [];
      carrito.push(iCarrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
    } else {
      let carritoStorage = localStorage.getItem('carrito') as string;
      let carrito = JSON.parse(carritoStorage);
      let index = -1;
      for(let i = 0; i < carrito.length; i++){
        let itemC: ItemCarrito = carrito[i];
        if(iCarrito.id === itemC.id){
          index = i;
          break;
        }
      }
      if(index == -1){
        carrito.push(iCarrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        this.toastr.success('Producto agregado al carrito', 'Producto Agregado');
      }else{
        let itemCarrito: ItemCarrito = carrito[index];
        itemCarrito.cantidad += 1;
        carrito[index] = itemCarrito;
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
     
    }
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
