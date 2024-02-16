// speed-gauge.component.ts
import { Component, OnInit, effect,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: '[history-table]',
  standalone: true,
  templateUrl: './history-table.component.html',
  imports: [ NgApexchartsModule,CommonModule, ],
  styleUrls: ['./history-table.component.scss'],
  providers: [DataService],
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'th';
  translations = this.languageService.translations

 



  private dataServiceSubscription: Subscription | undefined;
  public jsonData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 10;

  constructor(private dataService: DataService, private languageService: LanguageService) {}
  selectedFilter: string = '1day';
    
  ngOnInit(): void {
    this.loadData();
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;1
    }
  }
  


  private loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.jsonData = this.filterData(data,  this.selectedFilter);
        this.totalPages = Math.ceil(this.jsonData.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  changeFilter(event: any): void {
    this.selectedFilter = event.target.value;
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

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }


  
  
}