import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { VehicleDataService } from 'src/app/core/services/vehicledata.service';
import { FormsModule } from '@angular/forms';

interface VehicleData {
  v_type: number;
  v_count: number;
}

@Component({
  selector: '[speed-gauge]',
  standalone: true,
  templateUrl: './speed-gauge.component.html',
  imports: [ NgApexchartsModule, HttpClientModule, CommonModule,FormsModule],
  providers: [VehicleDataService],
  styleUrls:['./speed-gauge.component.scss']
})
export class SpeedGaugeComponent implements OnInit {

  public chartOptions: Partial<ChartOptions> = {};

  private currentFilter: string = 'all'; // Default filter value
  currentLanguage: string = 'th';
  translations = this.languageService.translations
  jsonData: VehicleData[] = [];



  selectedFilter: string = '30days';


  constructor(
    private languageService: LanguageService,
    private vehicleDataService: VehicleDataService ) {}

  ngOnInit(): void {

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.loadData(this.selectedFilter);
  }

  loadData(filter: string): void {
    const { startDate, endDate } = this.calculateDateRange(filter);
    const startTime = this.getFormattedDateTime(startDate);
    const endTime = this.getFormattedDateTime(endDate);


    this.vehicleDataService.getVehicleData(startTime, endTime).subscribe(
      (data) => {
        // Handle successful response
        this.jsonData = data.msg; // Assign fetched data
        console.log(data.msg);
        const sumOfVCount = this.getSumOfVCount();
        console.log('Sum of v_count:', sumOfVCount);
        const averageSpeed = this.getAverageSpeed();
        console.log('Average speed:', averageSpeed);
        this.chartOptions = this.generateChartOptions();
      },
        (error) => {
          console.error('Error fetching data:', error);
        }
    );

  }


  getSumOfVCount(): number {
    return this.jsonData.reduce((sum, item) => sum + item.v_count, 0);
  }
  
  calculateDateRange(filter: string): { startDate: Date; endDate: Date } {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (filter) {
      case '1day':
        startDate.setDate(today.getDate() - 1);
        break;
      case '7days':
        startDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(today.getDate() - 30);
        break;
      case '1year':
        startDate.setDate(today.getDate() - 365);
        break;
      default:
        break;
    }

    return { startDate, endDate: today };
  }


  private getFormattedDateTime(dateTime: Date): string {
    const year = dateTime.getFullYear();
    const month = this.padNumber(dateTime.getMonth() + 1);
    const day = this.padNumber(dateTime.getDate());
    const hours = this.padNumber(dateTime.getHours());
    const minutes = this.padNumber(dateTime.getMinutes());
    const seconds = this.padNumber(dateTime.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
  ngOnDestroy(): void {
  }

  changeFilter(event: any): void {
    this.currentFilter = event.target.value;

  }

  private translateLabel(label: string): string {
    return this.translations[this.currentLanguage][label] || label;
  }
  
  getAverageSpeed(): number {
    if (this.jsonData.length === 0) {
      return 0; // Return 0 if jsonData is empty to avoid division by zero
    }
    const totalSpeed = this.jsonData.reduce((sum, item) => sum + item.v_count, 0);
    return totalSpeed / this.jsonData.length;
  }


  private generateChartOptions(): Partial<ChartOptions> {
    const averageSpeed = Math.round(this.getAverageSpeed());
    const colors = ['#FF0000']
    return {
      nonaxisseries: [averageSpeed],
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


}