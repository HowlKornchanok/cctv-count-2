import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: '[main-column-chart]',
    templateUrl: './column-chart.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, NgApexchartsModule],
    styles: []
})

export class MainColumnChart implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;

  constructor(private themeService: ThemeService) {
    const baseColor = '#7239ea';
    const truckData = [33, 55, 32, 58, 41, 34, 23,34, 55, 32, 58, 41,]; 
    const carData = [95, 83, 79, 97, 72, 66, 95,95, 83, 79, 97, 72, ];
    const motorbikeData = [122, 144, 212, 213, 126, 145, 142,122, 144, 212, 213, 126];
    const busData = [22, 44, 12, 13, 26, 45, 42,22, 44, 12, 13, 26];
    const sumTruck = truckData.reduce((acc, value) => acc + value, 0);
    function sumVehicleType(data: number[]): number {
      return data.reduce((sum, value) => sum + value, 0);
    }
    const sumBus = sumVehicleType(busData);

    const SumVehData = truckData.map((truckValue, index) => {
      const carValue = carData[index];
      const motorbikeValue = motorbikeData[index];
      const BusValue = busData[index];
      return truckValue + carValue + motorbikeValue + BusValue;
    });

    

    this.chartOptions = {
      series: [
        {
          name: "Truck",
          data: carData,
          type: 'bar'
        },
        {
          name: "Car",
          data: carData,
          color: '#009900',
          type: 'bar'
        },
        {
          name: "Motorbike",
          data: motorbikeData,
          type: 'bar'
        },
        {
          name: "Bus",
          data: busData,
          type: 'bar'
        },
        {
          name: "Total",
          type: "line",
          data: SumVehData,
          color: '#FF0000'
        }
      ],
      chart: {
        foreColor: '#999',
        type: "line",
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
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011",
          "07/2011",
          "08/2011",
          "09/2011",
          "10/2011",
          "11/2011",
          "12/2011",
        ]
      },
      legend: {
        
        position: "right",
        offsetY: 40,
        onItemClick: {
          toggleDataSeries: true
      },
      },
      
     
      fill: {
        opacity: 0.9
      },

      
    };
  

    effect(() => {
      /** change chart theme */
      this.chartOptions.tooltip = {
        theme: this.themeService.themeChanged(),
      };
      
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}