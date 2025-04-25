import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);
  private apiUrl = environment.API_PORTFOLIO;
  private TOKEN_KEY = null;
  private router = inject(Router);

  login = injectMutation(() => ({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      firstValueFrom(
        this.http.post<{ token: string }>(`${this.apiUrl}/Auth/Login`, {
          email,
          password,
        })
      ),
      onSuccess: (response) =>  {
        this.setToken(response.token);
        if (this.queryClient) {
          this.queryClient.invalidateQueries({ queryKey: ['userInfo'] });
          this.queryClient.invalidateQueries({ queryKey: ['portefeuilles'] });
        }
      }
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
    return injectQuery(() => ({
      queryKey: ['userInfo'],
      queryFn: async () => {
        if (!this.isAuthenticated()) {
          return null;
        }

        const token = this.getToken();

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
      }
    }));
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      return !this.isTokenExpired(decodedToken);
    } catch (error) {
      this.logout();
      return false;
    }
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      if (this.isTokenExpired(decodedToken)) {
        this.logout();
        return null;
      }
      return token;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  private isTokenExpired(decodedToken: any): boolean {
    if (!decodedToken.exp) return true;
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() <= new Date().valueOf();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    this.router.navigate(['/']);
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
