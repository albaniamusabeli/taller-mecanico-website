import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { ContactoFormComponent } from './components/contacto-form/contacto-form.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MapComponent,
    ContactoFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MapComponent,
    ContactoFormComponent,
  ]
})
export class SharedModule { }
