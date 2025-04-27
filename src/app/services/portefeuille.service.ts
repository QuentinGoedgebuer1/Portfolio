import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface Actif {
  id: number;
  nom: string;
  symbole: string;
  montantInvesti: number;
  quantite: number;
  prix: number;
}

export interface Portefeuille {
  id: number;
  nom: string;
  actifs: Actif[];
  nbActifs?: number;
  totalInvesti?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortefeuilleService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private router = inject(Router);
  private authService = inject(AuthService);
  
  getPortefeuilles() {
    return injectQuery(() => {
        return {
        queryKey: ['portefeuilles'],
        queryFn: async () => {
          const token = this.authService.getToken();
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
        enabled: !!this.authService.getToken()
        };
    });
  }

  addPortefeuille = injectMutation(() => ({
    mutationFn: async ({ nom }: { nom: string; }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;

        const response = await lastValueFrom(
          this.http.post(`${this.apiUrl}/Portefeuille`, { nom }, {
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

  deletePortefeuille = injectMutation(() => ({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const token = this.authService.getToken();
        if (!token) return null;

        const response = await lastValueFrom(
          this.http.delete(`${this.apiUrl}/Portefeuille/${id}`, {
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

  updateActifPrice(portefeuilleId: number, actifId: number, price: number) {
    const portefeuilles = this.queryClient.getQueryData<Portefeuille[]>(['portefeuilles']);
    if (!portefeuilles) return;
  
    const updatedPortefeuilles = portefeuilles.map(portefeuille => {
      if (portefeuille.id !== portefeuilleId) {
        return portefeuille;
      }
  
      const updatedActifs = portefeuille.actifs.map(actif => {
        if (actif.id !== actifId) {
          return actif;
        }

        return {
          ...actif,
          prix: price
        };
      });
  
      return {
        ...portefeuille,
        actifs: updatedActifs
      };
    });
  
    this.queryClient.setQueryData(['portefeuilles'], updatedPortefeuilles);
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
