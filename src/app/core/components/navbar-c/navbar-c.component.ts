import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pmc-navbar-c',
  templateUrl: './navbar-c.component.html',
  styleUrls: ['./navbar-c.component.css']
})
export class NavbarCComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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
