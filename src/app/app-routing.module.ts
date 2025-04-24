import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FininsyComponent } from './components/fininsy/fininsy.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { RechercheComponent } from './components/fininsy/recherche/recherche.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'fininsy', component: FininsyComponent }
        ]
      },
      { path: '**', redirectTo: '/notfound' }
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
