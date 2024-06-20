import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pmc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'proyectoMenuComida';
  mostarNavbar = false;
  mostarNavbarC = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/login' || event.url === '/singIn') {
          this.mostarNavbar = false;
          
        } else {
          this.mostarNavbar = true;
        }
      }
    });
  }

  
  
}
