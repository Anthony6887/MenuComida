import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { TiendaComponent } from './tienda/tienda.component';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TiendaComponent,
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CarritoModule { }
