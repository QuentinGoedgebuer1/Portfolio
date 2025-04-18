import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private TOKEN_KEY = 'auth_token';
  private router = inject(Router);

  login = injectMutation(() => ({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        return await lastValueFrom(
          this.http.post<{ token: string }>(`${this.apiUrl}/Auth/Login`, { email, password })
        );
      } catch (error) {
        this.handleError(error);
        return null;
      }
    },
    onSuccess: (response: { token: string }) => {
      this.setToken(response.token);
      this.queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    }
  }));

  register = injectMutation(() => ({
    mutationFn: async ({ email, nom, prenom, password }: { email: string; nom: string; prenom: string; password: string }) => {
      try {
        return await lastValueFrom(
          this.http.post(`${this.apiUrl}/Utilisateur`, { email, nom, prenom, password })
        );
      } catch (error) {
        this.handleError(error);
        return null;
      }
    },
    onSuccess: (response: any) => {
      console.log('success', response);
    }
  }));

  getUserInfo() {
    return injectQuery(() => {
        const token = this.getToken();
        
        return {
        queryKey: ['userInfo'],
        queryFn: async () => {
            if (!token) return null;
            try {
            const response = await lastValueFrom(
                this.http.get<{ email: string }>(`${this.apiUrl}/Utilisateur/userInfo`, {
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


  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.queryClient.invalidateQueries({ queryKey: ['userInfo'] });
  }

  private handleError(error: any) {
    this.logout();
    this.router.navigate(['/']);
  }
}
