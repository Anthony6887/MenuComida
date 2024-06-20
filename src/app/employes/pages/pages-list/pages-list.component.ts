import { Component } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'pmc-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent {
  listEmpleados: User[] = [];
  form: FormGroup;
  filtro: string = '';
  selectedUserId: number | null = null;
  editing: boolean = false;

  constructor(private _empleadosService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      role: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadosService.getEmpleados().subscribe(data => {
      this.listEmpleados = data;
    });
  }

  deleteUser(id: number) {
    this._empleadosService.deleteUser(id).subscribe(() => {
      this.getEmpleados();
      this.toastr.warning('El empleado fue eliminado con exito', 'Empleado eliminado');
    })
  }


  handleSearch(value: string) {
    console.log(value);
  }
  handleRoleSelection(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement)?.value;
    if (selectedRole) {
      this.form.get('role')?.setValue(selectedRole);
    }
  }
  startEditing(id: number) {
    this.editing = true;
    this.selectedUserId = id;

    const selectedUser = this.listEmpleados.find(user => user.id === id);

    if (selectedUser) {
      this.form.patchValue(selectedUser);
    }
  }

  onSave() {
    if (this.editing) {
      this.updateEmpleado(this.selectedUserId!); // "!" para indicar que no es nulo
      console.log("editar")
    } else {
      this.addEmpleado();
      console.log("agregar")
    }
  }
  
  addEmpleado() {
    const user: User = {
      fname: this.form.value.fname,
      lname: this.form.value.lname,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      age: this.form.value.age,
      role: this.form.value.role
    };
  
    this._empleadosService.saveUser(user).subscribe(() => {
      this.toastr.success(`El empleado ${user.fname} fue registrado con éxito`, 'Empleado registrado');
      this.getEmpleados();
      window.location.reload();
    });
  }
  updateEmpleado(id: number) {
    const user: User = {
      fname: this.form.value.fname,
      lname: this.form.value.lname,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      age: this.form.value.age,
      role: this.form.value.role
    }

    this._empleadosService.updateUser(id, user).subscribe(() => {
      this.toastr.success(`El empleado ${user.fname} fue registrado con exito`, 'Cliente registrado');
      this.getEmpleados();
      window.location.reload()
    })
  }
  
}
