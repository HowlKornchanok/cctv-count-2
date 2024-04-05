import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { VehicleDataService } from 'src/app/core/services/vehicledata.service';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: '[history-table]',
  standalone: true,
  templateUrl: './history-table.component.html',
  imports: [NgApexchartsModule, CommonModule,FormsModule],
  styleUrls: ['./history-table.component.scss'],
  providers: [VehicleDataService],
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'th';
  translations: any; // Define translations property

  private dataServiceSubscription: Subscription | undefined;
  public jsonData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 10;
  selectedFilter: string = '1year'; // Default filter

  constructor(
    private vehicleDataService: VehicleDataService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
      this.translations = this.languageService.translations; // Assign translations
    });
  }

  loadInitialData(): void {
    this.loadData(this.selectedFilter);
  }

  loadData(filter: string): void {
    const { startDate, endDate } = this.calculateDateRange(filter);
    const startTime = this.getFormattedDateTime(startDate);
    const endTime = this.getFormattedDateTime(endDate);

    // Fetch data using VehicleDataService
    this.vehicleDataService.getVehicleData(startTime, endTime).subscribe(
      (data) => {
        // Handle successful response
        this.jsonData = data.msg; // Assign fetched data
        this.totalPages = Math.ceil(data.msg.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Helper method to format date and time
  private getFormattedDateTime(dateTime: Date): string {
    const year = dateTime.getFullYear();
    const month = this.padNumber(dateTime.getMonth() + 1);
    const day = this.padNumber(dateTime.getDate());
    const hours = this.padNumber(dateTime.getHours());
    const minutes = this.padNumber(dateTime.getMinutes());
    const seconds = this.padNumber(dateTime.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Helper method to pad numbers with leading zeros
  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  // Calculate date range based on the selected filter
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  exportToPDF(): void {
    const contentElement = document.getElementById('pdfContent');
    
    if (contentElement) {
      // Initialize the PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      let totalPages = this.totalPages;
  
      // Loop through each page
      for (let i = 0; i < totalPages; i++) {
        this.currentPage = i + 1; // Set the current page
  
        // Wait for the content to render
        setTimeout(() => {
          html2canvas(contentElement).then((canvas) => {
            const contentDataURL = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Add the content of each page to the PDF document
            pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
  
            // Add a new page if there are more pages to capture
            if (i < totalPages - 1) {
              pdf.addPage();
            } else {
              // Save the PDF document when all pages are captured
              pdf.save('history-table.pdf');
            }
          });
        }, 2000); // Adjust this timeout value based on your content rendering time
      }
    } else {
      console.error('Content element not found.');
    }
  }
  
}
