import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { NotFoundComponent } from './pages/not-found/not-found.component'; */

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./website/website.module').then( m => m.WebsiteModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-panel/admin-panel.module').then( m =>m.AdminPanelModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
