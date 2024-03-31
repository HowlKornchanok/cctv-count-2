import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LanguageService } from 'src/app/core/services/language.service';
import { VehicleDataService } from 'src/app/core/services/vehicledata.service';
import { FormsModule } from '@angular/forms';

interface VehicleData {
  v_type: number;
  record_time: string;
}

interface ChartData {
  title: string;
  value: number;
}

@Component({
  selector: '[PCUchart]',
  standalone: true,
  templateUrl: './PCU.component.html',
  imports: [AngularSvgIconModule,FormsModule, NgApexchartsModule],
  styles: [],
  providers: [VehicleDataService ],
})
export class PCUComponent implements OnInit, OnDestroy {
  private currentFilter: string = 'all'; // Default filter value
  currentLanguage: string = 'th';
  translations = this.languageService.translations
  jsonData: VehicleData[] = [];
  public chartOptions: Partial<ChartOptions> = {};
  public seriesData: any[] = [];


  selectedFilter: string = '90days';
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
        console.log(data.msg);
        const seriesData = this.separateDataByTypeAndDate();
        console.log('test',seriesData); 
      
        this.chartOptions = this.generateChartOptions(seriesData);
        
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
      case '90days':
        startDate.setDate(today.getDate() - 90);
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
  

  private separateDataByTypeAndDate(): any[] {
    // Clear previous data
    this.type_1 = [];
    this.type_2 = [];
    this.type_3 = [];
    this.type_4 = [];
    this.type_5 = [];
    this.type_6 = [];
    this.type_7 = [];
  
    // Create an object to store data grouped by date
    const dataGroupedByDate: { [date: string]: VehicleData[] } = {};
  
    // Group data by date
    this.jsonData.forEach((item) => {
      const date = new Date(item.record_time);
      let key;
      if (this.selectedFilter === '1year') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Group by year and month
      } else if (this.selectedFilter === '1day') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`; // Group by year, month, day, and hour
      } else {
        key = date.toDateString(); // Group by day
      }
  
      if (!dataGroupedByDate[key]) {
        dataGroupedByDate[key] = [];
      }
      dataGroupedByDate[key].push(item);
    });
  
    // Initialize chart data arrays
    const categories: string[] = Object.keys(dataGroupedByDate);
    const seriesData: { date: string; value: number }[] = [];
  
  
    // Iterate over grouped data to calculate PCU sums and update chart data
    categories.forEach((date) => {
      const dataForDate = dataGroupedByDate[date];
      let pcuSum = 0; // Initialize PCU sum for this group
  
      dataForDate.forEach((item) => {
        switch (item.v_type) {
          case 1:
            this.type_1.push(item);
            pcuSum += 0.333; // Add PCU factor for type 1
            break;
          case 2:
            this.type_2.push(item);
            pcuSum += 1; // Add PCU factor for type 2
            break;
          case 3:
            this.type_3.push(item);
            pcuSum += 1; // Add PCU factor for type 3
            break;
          case 4:
            this.type_4.push(item);
            pcuSum += 1.5; // Add PCU factor for type 4
            break;
          case 5:
            this.type_5.push(item);
            pcuSum += 2.1; // Add PCU factor for type 5
            break;
          case 6:
            this.type_6.push(item);
            pcuSum += 2.5; // Add PCU factor for type 6
            break;
          case 7:
            this.type_7.push(item);
            pcuSum += 2.5; // Add PCU factor for type 7
            break;
          default:
            break;
        }
      });
  
      console.log(`PCU sum for ${date}:`, pcuSum);
      seriesData.push({ date: date , value: pcuSum }); // Add PCU sum to series data as object with name and data
    });
  
    console.log('before return', seriesData); // Verify seriesData before return
    return seriesData; // Return seriesData after the loop has finished
    
  }
  
  
  

  private generateChartOptions(data: any[]): Partial<ChartOptions> {
    console.log(data);
    const dataArray: number[] = data.map(item => item.value);
    const dateArray: number[] = data.map(item => item.date);
    console.log(dateArray)
    console.log(dataArray);
    data = this.seriesData;
    
    return {
      series: [
        {
          name: "PCU",
          data: dataArray
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function(val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: dateArray,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },

      },
      title: {
        text: "PCU",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
}
