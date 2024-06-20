import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/enviroment' 
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  

  signIn(user: User): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApiUrl + '/login', user);
  }

  getEmpleados(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCliente(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`+'/cliente');
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl, user)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUser(id: number, user: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`, user);
  }

  validarCliente(userId: number): Observable<boolean> {
    // Utiliza el endpoint específico para obtener información del usuario por ID
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/${userId}`).pipe(
      map((user: User) => {
        // Verifica si el usuario tiene el rol de cliente
        return user.role === 'cliente';
      }),
      catchError(() => {
        // Manejo de errores en caso de que falle la solicitud
        return of(false); // Si falla, no es cliente
      })
    );
  }
}
