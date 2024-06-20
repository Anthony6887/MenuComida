import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../environments/enviroment';  
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/product';
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.myApiUrl}/crear`, productData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  saveProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateProduct(id: number, product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product);
  }


}
