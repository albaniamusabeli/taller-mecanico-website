import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEmployeesComponent } from './pages/admin-employees/admin-employees.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminServicesComponent } from './pages/admin-services/admin-services.component';
import { AdminVehiclesComponent } from './pages/admin-vehicles/admin-vehicles.component';
import { AdminInventoryComponent } from './pages/admin-inventory/admin-inventory.component';
import { AdminJobsComponent } from './pages/admin-jobs/admin-jobs.component';
import { BaseComponent } from './pages/base/base.component';
import { AdminClientesComponent } from './pages/admin-clientes/admin-clientes.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: BaseComponent, canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: '/admin/home', pathMatch: 'full'},
          { path: 'home', component: AdminHomeComponent, pathMatch: 'full' },
          { path: 'empleados', component: AdminEmployeesComponent },
          { path: 'servicios', component: AdminServicesComponent },
          { path: 'vehiculos', component: AdminVehiclesComponent },
          { path: 'trabajos', component: AdminJobsComponent },
          { path: 'clientes', component: AdminClientesComponent },
          { path: 'inventario', component: AdminInventoryComponent },
        ]
      },
      {
        path: 'login', component: AdminLoginComponent, canActivate: [LoginGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
