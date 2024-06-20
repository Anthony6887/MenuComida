import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishesRoutingModule } from './dishes-routing.module';
import { PagesListComponent } from './pages/pages-list/pages-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesListComponent
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    ReactiveFormsModule
  ]
})
export class DishesModule { }
