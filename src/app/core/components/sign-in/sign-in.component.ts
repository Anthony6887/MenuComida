import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'pmc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  lname: string = '';
  fname: string = '';
  email: string = '';
  age: number = 0;
  role: string = '';

  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) {

  }

  ngOnInit(): void {

  }

  addUser() {
    //validar que los campos no esten vacios
    if (this.username === '' || this.password === '' || this.confirmPassword === ''
      || this.lname === '' || this.fname === '' || this.email === '' || this.age === 0 || this.role === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //validar que las contraseñas sean iguales

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    //validar que el correo sea valido
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!pattern.test(this.email)) {
      this.toastr.error('El correo no es valido', 'Error');
      return;
    }

    //Crear el objeto
    const user: User = {
      username: this.username,
      password: this.password,
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      age: this.age,
      role: this.role
    }
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario Registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      }
    });
  }


}
