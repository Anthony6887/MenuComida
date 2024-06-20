import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './core/components/login/login.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'singIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'clientes',
    canLoad: [],
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule)
  },
  {
    path: 'empleados',
    canLoad: [],
    loadChildren: () =>
      import('./employes/employes.module').then((m) => m.EmployesModule)
  },
  {
    path: 'platos',
    canLoad: [],
    loadChildren: () =>
      import('./dishes/dishes.module').then((m) => m.DishesModule)
  },
  {
    path: 'calificaciones',
    canLoad: [],
    loadChildren: () =>
      import('./qualification/qualification.module').then((m) => m.QualificationModule)
  },
  {
    path: 'carrito',
    canLoad: [],
    loadChildren: () =>
      import('./carrito/carrito.module').then((m) => m.CarritoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
