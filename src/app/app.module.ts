import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsiteModule } from './website/website.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Date import
import localeCl from '@angular/common/locales/es-CL';
import { registerLocaleData, DatePipe } from '@angular/common';
registerLocaleData(localeCl, 'es');


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebsiteModule,
    AdminPanelModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
