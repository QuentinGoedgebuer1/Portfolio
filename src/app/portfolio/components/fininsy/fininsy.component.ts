import { Component, OnInit } from '@angular/core';
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
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule  } from 'primeng/tabs';
import axios from "axios";
import { environment } from '../../../../environments/environment';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

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
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TabsModule
  ],
  templateUrl: './fininsy.component.html',
  styleUrls: ['./fininsy.component.scss']
})
export class FininsyComponent implements OnInit {

  action: string = 'AAPL';
  chartData: any;
  chartOptions: any;

  bottomPrice: any;
  topPrice: any;

  customers!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  constructor() {}

  async ngOnInit() {
    this.initChart();

    await this.fetchStockData('AAPL');

    this.customers = [
      {
        id: 1000,
        name: 'James Butt',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
      },
      {
        id: 1001,
        name: 'James Butter',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
      },
    ];

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
      switch (status) {
          case 'unqualified':
              return 'danger';
          case 'qualified':
              return 'success';
          case 'new':
              return 'info';
          case 'negotiation':
              return 'warn';
          case 'renewal':
              return null;
          default:
            return null;
      }
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
