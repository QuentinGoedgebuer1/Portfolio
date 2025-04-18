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
                    this.http.get<{ email: string }>(`${this.apiUrl}/Portefeuille`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );
                return response;
            } catch (error) {
                this.handleError(error);
                return null;
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
