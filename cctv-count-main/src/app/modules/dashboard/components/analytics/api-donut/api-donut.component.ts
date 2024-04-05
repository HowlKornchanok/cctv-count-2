import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnDestroy, OnInit, effect } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';

import { LanguageService } from 'src/app/core/services/language.service';
import { VehicleDataService } from 'src/app/core/services/vehicledata.service';
import { FormsModule } from '@angular/forms';

interface VehicleData {
  v_type: number;
}

interface ChartData {
  title: string;
  value: number;
}

@Component({
  selector: '[api-donut]',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule,FormsModule],
  templateUrl: './api-donut.component.html',
  styleUrl: './api-donut.component.scss',
  providers: [VehicleDataService],
})
export class APIDonutComponent implements OnInit, OnDestroy {
  public chartOptions: any[] = [];
  public chartOptionsMotorcycle: Partial<ChartOptions> = {};
  public chartOptionsCar: Partial<ChartOptions> = {};
  public chartOptionsPickUp: Partial<ChartOptions> = {};
  public chartOptionsMiniBus: Partial<ChartOptions> = {};
  public chartOptionsTruck: Partial<ChartOptions> = {};
  public chartOptionBus: Partial<ChartOptions> = {};
  public chartOptionTrailer: Partial<ChartOptions> = {};
  private currentFilter: string = 'all'; // Default filter value
  currentLanguage: string = 'th';
  translations = this.languageService.translations
  jsonData: VehicleData[] = [];



  selectedFilter: string = '1year';
  public type_1: VehicleData[] = [];
  public type_2: VehicleData[] = [];
  public type_3: VehicleData[] = [];
  public type_4: VehicleData[] = [];
  public type_5: VehicleData[] = [];
  public type_6: VehicleData[] = [];
  public type_7: VehicleData[] = [];


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

        this.separateDataByType();
        this.chartOptionsMotorcycle = this.getChartOptions('Motorcycle', this.type_1.length, this.jsonData.length, '#34495e');
        this.chartOptionsCar = this.getChartOptions('Car', this.type_2.length, this.jsonData.length, '#34495e');
        this.chartOptionsPickUp = this.getChartOptions('Pick-Up', this.type_3.length, this.jsonData.length, '#34495e');
        this.chartOptionsMiniBus = this.getChartOptions('Mini Bus', this.type_4.length, this.jsonData.length, '#34495e');
        this.chartOptionsTruck = this.getChartOptions('Truck', this.type_5.length, this.jsonData.length, '#34495e');
        this.chartOptionBus = this.getChartOptions('Bus', this.type_6.length, this.jsonData.length, '#34495e');
        this.chartOptionTrailer = this.getChartOptions('Trailer', this.type_7.length, this.jsonData.length, '#34495e');
        
      },
        (error) => {
          console.error('Error fetching data:', error);
        }
    );

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
  

  separateDataByType(): void {
    // Clear previous data
    this.type_1 = [];
    this.type_2 = [];
    this.type_3 = [];
    this.type_4 = [];
    this.type_5 = [];
    this.type_6 = [];
    this.type_7 = [];

    
    
    // Separate data by v_type
    this.jsonData.forEach((item) => {
      switch (item.v_type) {
        case 1:
          this.type_1.push(item);
          break;
        case 2:
          this.type_2.push(item);
          break;
        case 3:
          this.type_3.push(item);
          break;
        case 4:
          this.type_4.push(item);
          break;
        case 5:
          this.type_5.push(item);
          break;
        case 6:
          this.type_6.push(item);
          break;
        case 7:
          this.type_7.push(item);
          break;
        default:
          break;
      }
    });

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
          
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels:[translatedTitle]

      
      
    };
    

  }
  
}