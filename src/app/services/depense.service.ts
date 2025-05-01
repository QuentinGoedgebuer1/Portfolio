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
export class DepenseService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private authService = inject(AuthService);
  private router = inject(Router);

  getDepenses() {
    return injectQuery(() => {
        return {
        queryKey: ['depenses'],
        queryFn: async () => {
          const token = this.authService.getToken();
          if (!token) return null;

          try {
            const response = await lastValueFrom(
                this.http.get(`${this.apiUrl}/Depense`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            );
            console.log("getDepenses : ", response);
            return response;
          } catch (error) {
              this.handleError(error);
              throw error;
          }
        },
        enabled: !!this.authService.getToken()
        };
    });
  }

  addDepense = injectMutation(() => ({
    mutationFn: async ({ nom, montant, jour }: { nom: string; montant: number; jour: number; }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;

        const response = await lastValueFrom(
          this.http.post(`${this.apiUrl}/Depense`, { nom, montant, jour }, {
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
      this.queryClient.invalidateQueries({ queryKey: ['depenses'] });
    }
  }));

  deleteDepense = injectMutation(() => ({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;
        const response = await lastValueFrom(
          this.http.delete(`${this.apiUrl}/Depense/${id}`, {
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
      this.queryClient.invalidateQueries({ queryKey: ['depenses'] });
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