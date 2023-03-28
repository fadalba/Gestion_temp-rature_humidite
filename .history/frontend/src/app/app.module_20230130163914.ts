import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/authconfig.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { HeaderComponent } from './components/header/header.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { TableArchiveComponent } from './components/table-archive/table-archive.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestComponent } from './components/test/test.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
    declarations: [
        AppComponent,
        ConnectionComponent,
        HeaderComponent,
        TableauComponent,
        PageAdminComponent,
        TableArchiveComponent,
        SidebarComponent,
   
        TestComponent,
            NotfoundComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        FormsModule,
        NgxPaginationModule,

    ]
})
export class AppModule { }
