import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PCUPhaseDataService } from 'src/app/core/services/pcu-phase-data.service';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
@Component({
  selector: '[PCUchart]',
  standalone: true,
  templateUrl: './PCU.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule],
  styles: [],
  providers: [PCUPhaseDataService],
})
export class PCUComponent implements OnInit, OnDestroy {
  private dataServiceSubscription: Subscription | undefined;
  public currentFilter: string = '1day';
  public chartOptions: Partial<ChartOptions> = {};
  currentLanguage: string = 'th';
  translations = this.languageService.translations


  constructor(
    private themeService: ThemeService,
    private pcuPhasedataService: PCUPhaseDataService,
    private languageService: LanguageService
  ) {
    effect(() => {
      this.chartOptions.tooltip = {
        theme: this.themeService.themeChanged(),
      };
      
    });
  }

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
    this.dataServiceSubscription = this.pcuPhasedataService.getData().subscribe(
      (data) => {
        const filteredData = this.filterData(data, this.currentFilter);
        this.chartOptions = this.generateChartOptions(filteredData);
      },
      (error) => {
        console.error('Error fetching PCU data:', error);
      }
    );
  }

  private filterData(data: any[], interval: string): any[] {
    const today = new Date();
    const isLast1Day = this.currentFilter === '1day';
    let filterDate: Date;
    let categories;

    if (isLast1Day) {
        
    } else {
      categories = data.map((entry) => entry.date);
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
        return data;
    }

    return data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= filterDate && entryDate <= today;
    });
  }
  changeFilter(event: any): void {
    this.currentFilter = event.target.value;
    this.loadData();
  }
  private generateChartOptions(data: any[]): Partial<ChartOptions> {
    const isLast1Day = this.currentFilter === '1day';
    let categories;

    if (isLast1Day) {
      categories = data.map((entry) => entry.time);
    } else {
      categories = data.map((entry) => entry.date);
    }

    const seriesData = [
      {
        name: 'Phase 1',
        data: data.map((entry) => entry.phase1),
        type: 'bar',
        color: '#FFFF8F'
      },
      {
        name: 'Phase 2',
        data: data.map((entry) => entry.phase2),
        type: 'bar',
        color: '#FFD700'
      },
      {
        name: 'Phase 3',
        data: data.map((entry) => entry.phase3),
        type: 'bar',
      },
      {
        name: 'Average PCU',
        type: 'line',
        data: (data.map((entry) => Math.round(entry.average_pcu))),
        color: '#FF7518',
      },
    ];

    return {
      series: seriesData,
      chart: {
        foreColor: '#999',
        type: 'line',
        height: '100%',
        width: '100%',
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [3],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: categories,
      },
      legend: {
        position: 'bottom',
        onItemClick: {
          toggleDataSeries: true,
        },
      },
      fill: {
        opacity: 1,
      },
    };
  }
}
