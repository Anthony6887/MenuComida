import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { RaitingStarComponent } from '../core/components/raiting-star/raiting-star.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    RaitingStarComponent
  ],
  imports: [

  ],
  exports: [
    SpinnerComponent,
    RaitingStarComponent
  ]
})
export class SharedModule { }
