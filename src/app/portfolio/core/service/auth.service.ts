import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      firstValueFrom(
        this.http.post<{ token: string }>(`${this.apiUrl}/Auth/Login`, {
          email,
          password,
        })
      ),
      onSuccess: (response) => this.setToken(response.token),
      onSettled: () => this.queryClient.invalidateQueries({ queryKey: ['userInfo'] })
  }));

  register = injectMutation(() => ({
    mutationFn: async ({ email, nom, prenom, password }: { email: string; nom: string; prenom: string; password: string }) => 
      firstValueFrom(
        this.http.post(`${this.apiUrl}/Utilisateur`, 
          { 
            email, 
            nom, 
            prenom, 
            password 
          })
      )
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
                throw error;
              }
          },
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
  }

  private handleError(error: any) {
    console.log("handleError : ", error);
  
    switch (error.status) {
      case 401:
        console.warn('Erreur 401 : non autorisé');
        this.logout();
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
