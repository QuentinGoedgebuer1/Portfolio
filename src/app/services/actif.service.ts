import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ActifService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private authService = inject(AuthService);
  private router = inject(Router);
  
  addActif = injectMutation(() => ({
    mutationFn: async ({ nom, symbole, montantInvesti, quantite, portefeuilleId }: { nom: string; symbole: string; montantInvesti: number; quantite: number; portefeuilleId: number; }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;

        const response = await lastValueFrom(
          this.http.post(`${this.apiUrl}/Actif`, { nom, symbole, montantInvesti, quantite, portefeuilleId }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },
    onSettled: () => {
      this.queryClient.invalidateQueries({ queryKey: ['portefeuilles'] });
    }
  }));

  deleteActif = injectMutation(() => ({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;
        const response = await lastValueFrom(
          this.http.delete(`${this.apiUrl}/Actif/${id}`, {
            headers: { Authorization: "Bearer " + token }
          })
        );
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },
    onSettled: () => {
      this.queryClient.invalidateQueries({ queryKey: ['portefeuilles'] });
    }
  }));

  private handleError(error: any) {
    console.log("handleError : ", error);
  
    switch (error.status) {
      case 401:
        console.warn('Erreur 401 : non autorisé');
        this.authService.logout();
        this.router.navigate(['/']);
        break;
  
      case 403:
        console.warn('Erreur 403 : accès interdit');
        // Tu peux gérer différemment si besoin
        break;
  
      case 500:
        console.error('Erreur 500 : erreur serveur');
        break;
  
      default:
        console.error(`Erreur inattendue (${error.status})`, error);
        break;
    }
  }  
}