import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { DashboardComponent } from './portfolio/components/dashboard/dashboard.component';
import { FininsyComponent } from './portfolio/components/fininsy/fininsy.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', component: DashboardComponent },
                    { path: 'fininsy', component: FininsyComponent },
                ]
            },
            { path: 'auth', loadChildren: () => import('./portfolio/components/auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
