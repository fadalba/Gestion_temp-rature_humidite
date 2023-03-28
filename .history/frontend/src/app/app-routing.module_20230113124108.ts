import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffichageActifsComponent } from './components/affichage-actifs/affichage-actifs.component';
import { AffichageArchivesComponent } from './components/affichage-archives/affichage-archives.component';
import { AffichageactiforUserComponent } from './components/affichageactifor-user/affichageactifor-user.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { EspaceutilisateurComponent } from './components/espaceutilisateur/espaceutilisateur.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebaruserComponent } from './components/sidebaruser/sidebaruser.component';
import { TabactiforUtilisComponent } from './components/tabactifor-utilis/tabactifor-utilis.component';
import { TableArchiveComponent } from './components/table-archive/table-archive.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { TestComponent } from './components/test/test.component';
import { Test2Component } from './components/test2/test2.component';
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component:ConnectionComponent},
  { path: 'sign-up', component: InscriptionComponent , canActivate: [AuthGuard]},
  // { path: 'side', component: SidebarComponent },
   { path: 'tabActif', component: AffichageactiforUserComponent },
  // { path: 'tabArchives', component: TableArchiveComponent },
  { path: 'EspaceUser', component: PageAdminComponent },
  { path: 'EspaceAdmin', component: PageAdminComponent },
  { path: 'ListActifs', component: AffichageActifsComponent },
  { path: 'listArchives', component: AffichageArchivesComponent},
  { path: 'user-profile/:id', component: PageAdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
