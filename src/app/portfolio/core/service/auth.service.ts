import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    // private queryClient = inject(QueryClient);
    private apiUrl = environment.API_PORTFOLIO;
    private TOKEN_KEY = null;

    login = injectMutation(() => ({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            try {
                return await lastValueFrom(this.http.post<{ token: string }>(`${this.apiUrl}/Auth/Login`, { email, password }));
            } catch (error) {
                throw new Error('Erreur lors de la connexion');
            }
        },
        onSuccess: (response: { token: string }) => {
            this.setToken(response.token);
        }
    })); 

    register = injectMutation(() => ({
        mutationFn: async ({ email, nom, prenom, password }: { email: string; nom: string, prenom: string; password: string }) => {
            try {
                return await lastValueFrom(this.http.post(`${this.apiUrl}/Utilisateur`, { email, nom, prenom, password}));
            } catch (error) {
                throw new Error('Erreur lors de l\'inscription');
            }
        },
        onSuccess: (response: any) => {
            console.log('success', response);
        }
    }));

    setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        this.setToken(null);
        localStorage.removeItem(this.TOKEN_KEY);
    }
}
