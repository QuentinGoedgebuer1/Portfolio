import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import MyTheme from './layout/themes/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private primeng: PrimeNG) {
        
        this.primeng.theme.set({
            preset: MyTheme,
                options: {
                    darkModeSelector: false || 'none',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities'
                    }
                }
            })
     }
}
