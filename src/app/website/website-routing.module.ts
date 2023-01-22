import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BaseComponent } from './base/base.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ReservationComponent } from './auth/reservation/reservation.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: BaseComponent,

        children: [
          {path: '', component: HomeComponent, pathMatch: 'full'},
          {path: 'contacto', component: ContactoComponent},
          {path: 'servicios', component: ServiciosComponent},
          {path: 'nosotros', component: NosotrosComponent},
          {path: 'registro', component: RegisterComponent},
          {path: 'ingreso', component: LoginComponent},
          {path: 'perfil', component: ProfileComponent},
          {path: 'agenda', component: ReservationComponent},
        ]},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
