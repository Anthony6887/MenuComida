import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pmc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  empleados() {
    this.router.navigate(['/empleados']);
  }
  clientes() {
    this.router.navigate(['/clientes']);
  }
  platos() {
    this.router.navigate(['/platos']);
  }
  calificaciones() {
    this.router.navigate(['/calificaciones']);
  }
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
  carrito() {
    this.router.navigate(['/carrito']);
  }
}
