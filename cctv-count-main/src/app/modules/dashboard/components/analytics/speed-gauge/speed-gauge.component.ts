import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: '[speed-gauge]',
  standalone: true,
  templateUrl: './speed-gauge.component.html',
  imports: [ NgApexchartsModule, HttpClientModule, CommonModule],
  providers: [DataService],
  styleUrls:['./speed-gauge.component.scss']
})
export class SpeedGaugeComponent implements OnInit {
  public jsonData: any[] = [];
  public chartOptions: Partial<ChartOptions> = {};
  private dataServiceSubscription: Subscription | undefined;
  currentLanguage: string = 'th';
  translations = this.languageService.translations




  
  constructor(private dataService: DataService ,private languageService: LanguageService) {}
  currentFilter: string = '7days';
  
  ngOnInit(): void {
    this.loadData();
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
      
    }
  }

  private loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.jsonData = this.filterData(data, this.currentFilter);
        this.chartOptions = this.generateChartOptions(this.jsonData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  changeFilter(event: any): void {
    this.currentFilter = event.target.value;
    this.loadData();
  }

  private filterData(data: any[], interval: string): any[] {
    const today = new Date();
    let filterDate: Date;

    switch (interval) {
      case '1day':
        filterDate = new Date(today);
        filterDate.setDate(today.getDate() - 1);
        break;
      case '7days':
        filterDate = new Date(today);
        filterDate.setDate(today.getDate() - 7);
        break;
      case '1month':
        filterDate = new Date(today);
        filterDate.setMonth(today.getMonth() - 1);
        break;
      default:
        // Default to all data
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filterDate && itemDate <= today;
    });
  }

  private generateChartOptions(data: any[]): Partial<ChartOptions> {
    const overallAverageSpeed = Math.round(this.calculateOverallAverageSpeed(data));
    const colors = ['#FF0000']
    return {
      nonaxisseries: [overallAverageSpeed],
      colors: colors,
      chart: {

        foreColor: '#999',
        type: "radialBar",
        height: 300,
        width: '100%',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }

      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],

      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: "70%",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "0%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 1,
              opacity: 0.1
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString() + 'KM/Hr';
              },
              color: "#888",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      
      legend: {
        show:false,
        position: "right",
        offsetY: 40,
        onItemClick: {
          toggleDataSeries: true
      },
      },
      
     
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ['#00FF00'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ['AverageSpeed']
      
      
      
    };
  }

  private calculateOverallAverageSpeed(data: any[]): number {
    const totalSpeed = data.reduce((sum, item) => sum + item.speed, 0);
    return totalSpeed / data.length;
  }
}