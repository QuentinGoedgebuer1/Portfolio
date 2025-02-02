import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import axios from "axios";

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.scss'
})
export class RechercheComponent {

  action: string = 'AAPL';
  chartData: any;
  chartOptions: any;

  bottomPrice: any;
  topPrice: any;

  async ngOnInit() {
    this.initChart();

    await this.fetchStockData('AAPL');
  }

  initChart() {
    const textColor = '#FFFFFF';
    const textColorSecondary = '#FFFFFF';

    this.chartData = {
      labels: [
        '10/10/2024', 
        '11/10/2024', 
        '14/10/2024', 
        '15/10/2024', 
        '16/10/2024', 
        '17/10/2024', 
        '18/10/2024'
      ],
      datasets: [
        {
          label: 'Performance',
          data: [229.04, 100, 231.3, 233.85, 400, 232.15, 235],
          fill: false,
          tension: 0.4,
          backgroundColor: '#6366F1',
          borderColor: '#6366F1',
          borderWidth: 2
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        title: {
          display: true,
          text: this.action,
          color: textColor,
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
          displayColors: false,
          backgroundColor: '#ffffff',
          titleColor: '#000000',
          bodyColor: '#000000',
          borderColor: '#ffffff',
          borderWidth: 1,
          callbacks: {
            title: (item) => {
                return `${item[0].label}`;
            },
            label: (item) => {
                return `${item.raw} €`;
            }
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: false
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Dates',
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Prix',
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    };
  }

  async fetchStockData(symbol: string) {
    const apiKey = environment.API_POLYGON;
    const today = new Date();
    const tenDaysBefore = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);

    const startDate = `${tenDaysBefore.getFullYear()}-${(tenDaysBefore.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${tenDaysBefore.getDate().toString().padStart(2, "0")}`;
    const endDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${startDate}/${endDate}?apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.results) {
        const prices = data.results.map((item) => ({
          date: new Date(item.t).toLocaleDateString(),
          close: item.c,
        }));

        this.chartData ={
          labels: prices.map((item) => item.date),
          datasets: [
            {
              label: "Prix de clôture",
              data: prices.map((item) => item.close),
            },
          ],
        };

        this.chartOptions.plugins.title.text = this.action;
        const closeValues = prices.map((item) => item.close);
        const min = Math.min(...closeValues);
        const max = Math.max(...closeValues);

        this.bottomPrice = min;
        this.topPrice = max;
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
