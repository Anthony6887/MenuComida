import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployesRoutingModule } from './employes-routing.module';
import { PagesListComponent } from './pages/pages-list/pages-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PagesListComponent,
  ],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule
    
  ]
})
export class EmployesModule { }
