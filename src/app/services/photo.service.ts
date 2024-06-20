import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/photo';
  }

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, fd);
  }

  getPhotos() {
    return this.http.get<Photo[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, { title, description });
  }
}
