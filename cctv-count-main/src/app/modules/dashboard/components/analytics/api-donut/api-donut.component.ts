import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnDestroy, OnInit, effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { DataService } from 'src/app/core/services/data.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: '[api-donut]',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './api-donut.component.html',
  styleUrl: './api-donut.component.scss',
  providers: [DataService],
})
export class APIDonutComponent implements OnInit, OnDestroy {
  public chartOptionsCar: Partial<ChartOptions> = {};
  public chartOptionsMotorcycle: Partial<ChartOptions> = {};
  public chartOptionsTruck: Partial<ChartOptions> = {};
  private dataServiceSubscription: Subscription | undefined;
  private currentFilter: string = 'all'; // Default filter value
  currentLanguage: string = 'th';
  translations = this.languageService.translations



  constructor(private dataService: DataService ,private languageService: LanguageService ) {}

  ngOnInit(): void {

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  changeFilter(event: any): void {
    this.currentFilter = event.target.value;
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getData().subscribe((vehicleData) => {
      const filteredData = this.filterData(vehicleData, this.currentFilter);
      const carData = filteredData.filter((entry) => entry.vehicleType === 'Car').map((entry) => entry.speed);
      const MotorcycleData = filteredData.filter((entry) => entry.vehicleType === 'Motorcycle').map((entry) => entry.speed);
      const truckData = filteredData.filter((entry) => entry.vehicleType === 'Truck').map((entry) => entry.speed);
      

      const sumCar = this.sumVehicleType(carData);
      const sumMotorcycle = this.sumVehicleType(MotorcycleData);
      const sumTruck = this.sumVehicleType(truckData);
      const sumVeh = sumCar + sumMotorcycle + sumTruck;

      this.chartOptionsCar = this.getChartOptions('Car', sumCar, sumVeh, '#34495e');
      this.chartOptionsMotorcycle = this.getChartOptions('Motorcycle', sumMotorcycle, sumVeh, '#3498db');
      this.chartOptionsTruck = this.getChartOptions('Truck', sumTruck, sumVeh, '#2ecc71');
    });
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


  private sumVehicleType(data: number[]): number {
    return data.reduce((sum, value) => sum + value, 0);
  }

  private translateLabel(label: string): string {
    return this.translations[this.currentLanguage][label] || label;
  }
  

  private getChartOptions(title: string, value: number, total: number, color: string): Partial<ChartOptions> {
    const colors = ['#FF5733', '#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#ecf0f1', '#e67e22', '#34495e', '#d35400', '#bdc3c7'];
    const percent = Math.round((value / total) * 100);
    const translatedTitle = this.translateLabel(title);


    return {
      nonaxisseries: [percent],
      colors: colors,
      chart: {
        foreColor: '#999',
        type: "radialBar",
        height: 250,
        width: '80%',
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
          startAngle: 0,
          endAngle: 360,
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
            strokeWidth: "67%",
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
                return parseInt(val.toString(), 10).toString() + '%';
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
          gradientToColors: [color],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels:[translatedTitle]

      
      
    };
    

  }
  
}