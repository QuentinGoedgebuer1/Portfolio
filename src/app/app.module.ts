import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    ToastModule, 
    RouterModule, 
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    provideQueryClient(new QueryClient)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }