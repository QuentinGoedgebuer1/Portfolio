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
  private TOKEN_KEY = 'auth_token';
  private authService = inject(AuthService);
  private router = inject(Router);
  
  addActif = injectMutation(() => ({
    mutationFn: async ({ nom, symbole, montantInvesti, quantite, portefeuilleId }: { nom: string; symbole: string; montantInvesti: number; quantite: number; portefeuilleId: number; }) => {
      try {
        const token = this.getToken();
        return await lastValueFrom(
          this.http.post(`${this.apiUrl}/Actif`, { nom, symbole, montantInvesti, quantite, portefeuilleId }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );
      } catch (error) {
        this.handleError(error);
        return null;
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
    this.authService.logout();
    this.router.navigate(['/']);
  }
}