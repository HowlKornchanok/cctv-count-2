import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { FormsModule } from '@angular/forms';
import { VehicleDataService } from 'src/app/core/services/vehicledata.service';

interface VehicleData {
  v_type: number;
  record_time: string;
}

interface ChartData {
  title: string;
  value: number;
}
@Component({
    selector: '[api-stacked-column]',
    templateUrl: './api-stacked-column.component.html',
    standalone: true,
    imports: [NgApexchartsModule, FormsModule],
    styles: [],
    providers: [VehicleDataService]
})
export class ApiStackedColumnComponent implements OnInit, OnDestroy {
  private currentFilter: string = 'all'; // Default filter value
  currentLanguage: string = 'th';
  translations = this.languageService.translations
  jsonData: VehicleData[] = [];
  public chartOptions: Partial<ChartOptions> = {};
  public typeSeriesData: { [type: string]: { date: string; value: number }[] } = {};

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
    private vehicleDataService: VehicleDataService) {}

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
        this.jsonData = data.msg;
        const seriesData = this.separateDataByTypeAndDate();
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

  ngOnDestroy(): void {}

  changeFilter(event: any): void {
    this.currentFilter = event.target.value;
    this.loadInitialData();
  }

  private translateLabel(label: string): string {
    return this.translations[this.currentLanguage][label] || label;
  }

  private separateDataByTypeAndDate(): { [type: string]: { date: string; value: number }[] } {
    const dataGroupedByDate: { [date: string]: VehicleData[] } = {};

    this.jsonData.forEach((item) => {
      const date = new Date(item.record_time);
      let key;

      if (this.selectedFilter === '1year') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (this.selectedFilter === '1day') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
      } else {
        key = date.toDateString();
      }

      if (!dataGroupedByDate[key]) {
        dataGroupedByDate[key] = [];
      }
      dataGroupedByDate[key].push(item);
    });

    const categories: string[] = Object.keys(dataGroupedByDate);
    const typeseriesData: { [type: string]: { date: string; value: number }[] } = {
      'type_1': [],
      'type_2': [],
      'type_3': [],
      'type_4': [],
      'type_5': [],
      'type_6': [],
      'type_7': [],
    };

    categories.forEach((date) => {
      const dataForDate = dataGroupedByDate[date];
      let sum_type_1 = 0;
      let sum_type_2 = 0;
      let sum_type_3 = 0;
      let sum_type_4 = 0;
      let sum_type_5 = 0;
      let sum_type_6 = 0;
      let sum_type_7 = 0;

      dataForDate.forEach((item) => {
        switch (item.v_type) {
          case 1:
            sum_type_1 += 1;
            break;
          case 2:
            sum_type_2 += 1;
            break;
          case 3:
            sum_type_3 += 1;
            break;
          case 4:
            sum_type_4 += 1;
            break;
          case 5:
            sum_type_5 += 1;
            break;
          case 6:
            sum_type_6 += 1;
            break;
          case 7:
            sum_type_7 += 1;
            break;
          default:
            break;
        }
      });

      typeseriesData['type_1'].push({ date: date, value: sum_type_1 });
      typeseriesData['type_2'].push({ date: date, value: sum_type_2 });
      typeseriesData['type_3'].push({ date: date, value: sum_type_3 });
      typeseriesData['type_4'].push({ date: date, value: sum_type_4 });
      typeseriesData['type_5'].push({ date: date, value: sum_type_5 });
      typeseriesData['type_6'].push({ date: date, value: sum_type_6 });
      typeseriesData['type_7'].push({ date: date, value: sum_type_7 });
    });

    return typeseriesData;
  }

  private generateChartOptions(data: { [type: string]: { date: string; value: number }[] }): Partial<ChartOptions> {
    let categories;
    if (data && Object.keys(data).length > 0) {
      categories = data[Object.keys(data)[0]].map(entry => entry.date);
    }
  
    // Check if categories is defined before using it
    const total = categories ? categories.map(date => {
      return Object.values(data).reduce((acc, curr) => {
        const entry = curr.find(item => item.date === date);
        if (entry) {
          return acc + entry.value;
        }
        return acc;
      }, 0);
    }) : [];
  
    const seriesData = Object.keys(data).map(type => ({
      name: type,
      data: data[type].map(entry => entry.value),
      type: 'bar'
    }));
  
    // Adding the new series for "total"
    seriesData.push({
      name: "total",
      type: "line",
      data: total
    });
  
    return {
      series: seriesData,
      chart: {
        foreColor: '#999',
        type: 'line',
        height: '100%',
        width: '100%',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [7]
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: categories || [] // Provide an empty array if categories is undefined
      },
      legend: {
        position: 'bottom',
        onItemClick: {
          toggleDataSeries: true
        }
      },
      fill: {
        opacity: 0.9
      }
    };
  }
}  
