import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FininsyComponent } from './components/fininsy/fininsy.component';
import { ErreurComponent } from './layout/erreur/erreur.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'fininsy', component: FininsyComponent },
      { path: '**', component: ErreurComponent }
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
