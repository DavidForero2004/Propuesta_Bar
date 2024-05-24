import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chart!: Chart;
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colodata: any[] = [];

  // Datos para chart Bar
  labeldataBars: any[] = [];
  realdataBars: any[] = [];

  // Datos para chart Radar
  labeldataRadar: any[] = [];
  realdataRadar: any[] = [];

  // Datos para chart pie
  labeldataPie: any[] = [];
  realdataPie: any[] = [];

  // Datos para chart line
  labeldataLine: any[] = [];
  realdataLine: any[] = [];

  // Datos para chart polar
  labeldataPolar: any[] = [];
  realdataPolar: any[] = [];

  // Datos para chart bubble
  labeldataBubble: any[] = [];
  realdataBubble: any[] = [];


  constructor(
    private _orderService: OrderService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this._orderService.updateServerLanguage('es').subscribe(() => { });
  }

  ngOnInit(): void {
    this.getSales();
    this.getSalesMonth();
    this.getSalesProduct();
    this.getSalesProductMonth();
  }

  getSales() {
    this._orderService.getSalesTable().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        this.chartdata = result;
        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            this.labeldataRadar.push(this.chartdata[i].name_table);
            this.realdataRadar.push(this.chartdata[i].count);
            this.labeldataBubble.push(this.chartdata[i].name_table);
            this.realdataBubble.push(this.chartdata[i].total);
          }
          this.chartRadar(this.labeldataRadar, this.realdataRadar);
          this.chartScatter(this.labeldataBubble, this.realdataBubble);
        }
      }
    });
  }


  getSalesMonth() {
    this._orderService.getSalesMonth().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {  
        const result = data.result[0];
        this.chartdata = result;
        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            this.labeldataBars.push(this.chartdata[i].month_name)
            this.realdataBars.push(this.chartdata[i].total)
          }
          this.chartBars(this.labeldataBars, this.realdataBars);

        }
      }
    });
  }

  getSalesProduct() {
    this._orderService.getSalesProduct().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {  
        const result = data.result[0];
        this.chartdata = result;
        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            this.labeldataPie.push(this.chartdata[i].name_product)
            this.realdataPie.push(this.chartdata[i].total)
            this.labeldataPolar.push(this.chartdata[i].name_product)
            this.realdataPolar.push(this.chartdata[i].count)
          }
          this.chartPie(this.labeldataPie, this.realdataPie);
          this.chartPolar(this.labeldataPolar, this.realdataPolar);
        }
      }
    });
  }

  getSalesProductMonth() {
    this._orderService.getSalesProductMonth().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {  
        const result = data.result[0];
        if (this.chartdata != null) {
          for (let i = 0; i < this.chartdata.length; i++) {
            console.log(this.chartdata[i])
            this.labeldataLine.push(this.chartdata[i].name_product)
            this.realdataLine.push(this.chartdata[i].total)
          }
          this.chartLine(this.labeldataLine, this.realdataLine);

        }
      }
    });
  }

  chartBars(labeldata: any, maindata: any) {
    new Chart("chartBars", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales for Month (Actual Year)',
          data: maindata,
          backgroundColor: '#3a0709bf', // Color de las barras con 50% de transparencia
          borderColor: '#3A0709', // Color del borde de las barras
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  chartLine(labeldata: any, maindata: any) {
    new Chart("chart", {
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales for Product (Actual Month)',
          data: maindata,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  chartPie(labeldata: any, maindata: any) {
    new Chart("chartPie", {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales for Product (Actual Year)',
          data: maindata,
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 10,
              padding: 5
            }
          },
          title: {
            display: true,
            text: 'Sales for Product (Actual Year)',
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  chartPolar(labeldata: any, maindata: any) {
    new Chart("chartPolar", {
      type: 'polarArea',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Number of products ordered (Actual Year)',
          data: maindata,
          backgroundColor: '#3a0709bf',
          borderColor: '#3A0709',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 10,
              padding: 5
            }
          },
          title: {
            display: true,
            text: 'Number of products ordered (Actual Year)',
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              display: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  chartScatter(labeldata: any, maindata: any) {
    new Chart("chartScatter", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales for table (Actual Year)',
          data: maindata,
          backgroundColor: '#3a0709bf',
          borderColor: '#3A0709',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  chartRadar(labeldata: any, maindata: any) {
    new Chart("chartRadar", {
      type: 'radar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Number of products ordered for table (Actual Year)',
          data: maindata,
          backgroundColor: '#3a0709bf',
          borderColor: '#3A0709',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            pointLabels: {
              display: true
            },
            ticks: {
              display: false
            }
          },
          y: {
            beginAtZero: true
          }, 
        }
      }
    });
  }

  es() {
    this.translate.use('es');
    this._orderService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._orderService.updateServerLanguage('en').subscribe(() => { });
  }
}

