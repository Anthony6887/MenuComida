import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'pmc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  email: string = '';
  age: number = 0;
  role: string = '';
  fname: string = '';
  lname: string = '';


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService:ErrorService) { }


  ngOnInit(): void {

  }

  login() {
    //validar que los campos no esten vacios
    if (this.username === '' || this.password === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //Creamos el body
    const user: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      age: this.age,
      role: this.role
    }
    //llamamos al servicio
    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e);
        
      }
    })
  }


}
