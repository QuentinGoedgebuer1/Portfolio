import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PortefeuilleService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private TOKEN_KEY = 'auth_token';
  private router = inject(Router);
  private authService = inject(AuthService);
  
  getPortefeuilles() {
    return injectQuery(() => {
        const token = this.getToken();
        return {
        queryKey: ['portefeuilles'],
        queryFn: async () => {
            if (!token) return null;
            try {
                const response = await lastValueFrom(
                    this.http.get(`${this.apiUrl}/Portefeuille`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );
                return response;
            } catch (error) {
                this.handleError(error);
                throw error;
            }
        },
        enabled: !!token
        };
    });
  }

  addPortefeuille = injectMutation(() => ({
    mutationFn: async ({ nom }: { nom: string; }) => {
      try {
        const token = this.getToken();
        return await lastValueFrom(
          this.http.post(`${this.apiUrl}/Portefeuille`, { nom }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },
    onSuccess: (response: any) => {
      console.log('success', response);
    },
    onSettled: () => {
      this.queryClient.invalidateQueries({ queryKey: ['portefeuilles'] });
    }
  }));


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

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
