import { Component, OnDestroy, OnInit ,effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { SumVehDataService } from 'src/app/core/services/sum-veh-data.service';
import { SumVehByHourService } from 'src/app/core/services/sum-veh-by-hour.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
    selector: '[api-stacked-column]',
    templateUrl: './api-stacked-column.component.html',
    standalone: true,
    imports: [NgApexchartsModule],
    styles: [],
    providers: [SumVehDataService , SumVehByHourService]
})
export class ApiStackedColumnComponent implements OnInit, OnDestroy {
  public jsonData: any[] = [];
  public chartOptions: Partial<ChartOptions> = {};
  private dataServiceSubscription: Subscription | undefined;
  public currentFilter: string = '1day';
  currentLanguage : string = 'th';
  translations = this.languageService.translations

  constructor(
    private dataService: SumVehDataService,
    private dataServiceHour: SumVehByHourService,
    private themeService : ThemeService,
    private languageService : LanguageService
  ) {

    effect(() => {
      this.chartOptions.tooltip = {
        theme: this.themeService.themeChanged(),
      };
    });
  }
  
  ngOnInit(): void {
    // Load data when component initializes
    this.loadData();
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from data service subscription when component is destroyed
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    // Load data based on current filter selection
    if (this.currentFilter === '1day') {
      // Use the hourly service for 1 day filter
      this.dataServiceHour.getData().subscribe(
        (data) => {
          this.jsonData = this.filterData(data, this.currentFilter);
          this.chartOptions = this.generateChartOptions(this.jsonData);
        },
        (error) => {
          console.error('Error fetching data for 1 day:', error);
        }
      );
    } else {
      // Use the daily service for other filters
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
  }

  changeFilter(event: any): void {
    // Update current filter and reload data when filter selection changes
    this.currentFilter = event.target.value;
    this.loadData();
  }

  private filterData(data: any[], interval: string): any[] {
    // Filter data based on the selected interval
    const today = new Date();
    const isLast1Day = this.currentFilter === '1day';
    let filterDate: Date;
    let categories;
  
    if (isLast1Day) {
      // Handle date filtering for the last 1 day
    } else {
      // Combine data for the same date
      const groupedData = this.groupDataByDate(data);
      categories = Object.keys(groupedData);
    }
  
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
      case '1year':
        filterDate = new Date(today);
        filterDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        // If interval is not recognized, return the original data
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filterDate && itemDate <= today;
    });
  }

  private groupDataByDate(data: any[]): { [key: string]: any[] } {
    // Group data by date
    return data.reduce((result, entry) => {
      const dateKey = entry.date;
      result[dateKey] = result[dateKey] || [];
      result[dateKey].push(entry);
      return result;
    }, {});
  }

  private generateChartOptions(data: any[]): Partial<ChartOptions> {
    // Generate chart options based on the filtered data
    const isLast1Day = this.currentFilter === '1day';
    let categories;
  
    if (isLast1Day) {
      categories = data.map((entry) => entry.time);
    } else {
      categories = Object.keys(this.groupDataByDate(data));
    }
  
    const seriesData = [
      {
        name: 'Truck',
        data: data.map(entry => entry.sumTruck),
        type: 'bar',
      },
      {
        name: 'Car',
        data: data.map(entry => entry.sumCar),
        color: '#009900',
        type: 'bar',
      },
      {
        name: 'Motorbike',
        data: data.map(entry => entry.sumMotorcycle),
        type: 'bar',
      },
      {
        name: 'Bus',
        data: data.map(entry => entry.sumBus),
        type: 'bar'
      },
      {
        name: 'Total',
        type: 'line',
        data: data.map(entry => entry.sumVehicle),
        color: '#FF0000'
      }
    ];
    
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
        enabledOnSeries: [4]
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
        categories: categories
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
