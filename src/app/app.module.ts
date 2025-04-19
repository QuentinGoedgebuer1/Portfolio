import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, ToastModule],
    providers: [
        MessageService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideQueryClient(new QueryClient()),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
