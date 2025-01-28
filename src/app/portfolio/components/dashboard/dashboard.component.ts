import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { AnimateOnScroll } from 'primeng/animateonscroll';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CardModule,
        AvatarModule,
        ImageModule,
        AnimateOnScroll
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-primary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'Javascript', 
                'VueJs/ReactJs/AngularJs', 
                'NestJs', 
                'Php/Symfony', 
                'Api Rest', 
                '.Net', 
                'Flutter', 
                'SqlServer/PostgreSql', 
                'PowerBI', 
                'Azure Data Factory',
                'Azure',
                'Git',
                'BitBucket/Github',
                'Docker'
            ],
            datasets: [
                {
                    label: 'Compétences',
                    data: [
                        70, //Javascript
                        70, //VueJs/ReactJs/AngularJs
                        50, //NestJs
                        40, //Php/Symfony
                        70, //Api Rest
                        70, //.Net
                        40, //Flutter
                        60, //SqlServer/PostgreSql
                        55, //PowerBI
                        55, //Azure Data Factory
                        55, //Azure
                        70, //Git
                        70, //BitBucket/Github
                        60 //Docker
                    ],
                    fill: false,
                    tension: .4,
                    backgroundColor: ['#3b82f6'],
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                },
            ]
        };

        this.chartOptions = {
            plugins: {
                title: {
                    display: true,
                    text: 'Liste des compétences',
                    color: textColor,
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    backgroundColor: '#ffffff',
                    titleColor: '#000000',
                    bodyColor: '#000000',
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} %`;
                        }
                    }
                }
            },
            options: {
                animation: {
                    duration: 1000, // durée en millisecondes
                    easing: 'easeOutBounce' // effet d'animation
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Compétences',
                        color: textColorSecondary,
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Niveau',
                        color: textColorSecondary,
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
