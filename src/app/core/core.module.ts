import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FooterComponent } from './components/footer/footer.component';
import { RaitingStarComponent } from './components/raiting-star/raiting-star.component';
import { NavbarCComponent } from './components/navbar-c/navbar-c.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarCComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NavbarCComponent
  ]
})
export class CoreModule { }
