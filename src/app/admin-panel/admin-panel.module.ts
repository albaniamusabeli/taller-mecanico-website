import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { BaseComponent } from './pages/base/base.component';
import { AdminServicesComponent } from './pages/admin-services/admin-services.component';
import { AdminEmployeesComponent } from './pages/admin-employees/admin-employees.component';
import { AdminVehiclesComponent } from './pages/admin-vehicles/admin-vehicles.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminInventoryComponent } from './pages/admin-inventory/admin-inventory.component';
import { AdminJobsComponent } from './pages/admin-jobs/admin-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminClientesComponent } from './pages/admin-clientes/admin-clientes.component';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEmployeeComponent } from './components/modal-employee/modal-employee.component';
import { ModalClientComponent } from './components/modal-client/modal-client.component';
import { ModalVehicleComponent } from './components/modal-vehicle/modal-vehicle.component';
import { ModalJobComponent } from './components/modal-job/modal-job.component';

import { ExporterService } from './services/exporter.service';
import { ModalInventoryComponent } from './components/modal-inventory/modal-inventory.component'; 


@NgModule({
  declarations: [
    BaseComponent,
    AdminServicesComponent,
    AdminEmployeesComponent,
    AdminVehiclesComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminJobsComponent,
    AdminInventoryComponent,
    AdminClientesComponent,
    ModalServiceComponent,
    ModalEmployeeComponent,
    ModalClientComponent,
    ModalVehicleComponent,
    ModalJobComponent,
    ModalInventoryComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    DatePipe,
    ExporterService
  ]
})
export class AdminPanelModule { }
