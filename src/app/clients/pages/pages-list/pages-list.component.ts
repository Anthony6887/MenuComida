import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pmc-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent {

  form: FormGroup;
  listClientes: User[] = [];
  selectedUserId: number | null = null;
  editing: boolean = false;

  filtro: string = '';
  constructor(private _userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      role: ['', Validators.required]

    });


  }

  ngOnInit(): void {
    this.getClientes();
  }

  startEditing(id: number) {
    this.editing = true;
    this.selectedUserId = id;

    const selectedUser = this.listClientes.find(user => user.id === id);

    if (selectedUser) {
      this.form.patchValue(selectedUser);
    }
  }

  onSave() {
    if (this.editing) {
      this.updateCliente(this.selectedUserId!); // "!" para indicar que no es nulo
      console.log("editar")
    } else {
      this.addCliente();
      console.log("agregar")
    }
  }


  getClientes() {
    this._userService.getCliente().subscribe(data => {
      this.listClientes = data;
    });
  }
  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(() => {
      this.getClientes();
      this.toastr.warning('El cliente fue eliminado con exito', 'Cliente eliminado');
    })
  }

  handleSearch(value: string) {
    console.log(value);
  }

  addCliente() {
    const user: User = {
      fname: this.form.value.fname,
      lname: this.form.value.lname,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      age: this.form.value.age,
      role: this.form.value.role = 'Cliente'

    }
    this._userService.saveUser(user).subscribe(() => {
      this.toastr.success(`El cliente ${user.fname} fue registrado con exito`, 'Cliente registrado');
      this.getClientes();
      window.location.reload()
    })
  }

  updateCliente(id: number) {
    const user: User = {
      fname: this.form.value.fname,
      lname: this.form.value.lname,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      age: this.form.value.age,
      role: this.form.value.role = 'Cliente'
    }

    this._userService.updateUser(id, user).subscribe(() => {
      this.toastr.success(`El cliente ${user.fname} fue registrado con exito`, 'Cliente registrado');
      this.getClientes();
      window.location.reload()
    })
  }

}

