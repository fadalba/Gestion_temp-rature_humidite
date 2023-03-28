import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
  { path: 'page-', redirectTo: '/page-admin', pathMatch: 'full' },
  { path: 'log-in', component: ConnectionComponent },
  { path: 'sign-up', component: InscriptionComponent },
  { path: 'user-profile/:id', component: PageAdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
