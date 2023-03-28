import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from "./service/auth.guard";
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './components/connection/connection.component';
import { HeaderComponent } from './components/header/header.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableArchiveComponent } from './components/table-archive/table-archive.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: "log-in"},
  { path: 'log-in', component:ConnectionComponent},
  { path: 'bd', component: PageAdminComponent, canActivate: [AuthGuard]  },
  { path: 'user-profile', component: PageAdminComponent, canActivate: [AuthGuard] },
  { path: 'actif', component: TableauComponent, canActivate: [AuthGuard] },
  { path: 'archives', component: TableArchiveComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: PageAdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
