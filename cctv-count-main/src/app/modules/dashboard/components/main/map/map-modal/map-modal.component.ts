import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/dashboard/components/main/map/services/modal.service';
import { LocationData, CameraData } from './location-data.interface';
import { MapDataService } from '../services/map-data.service';
import { LanguageService } from 'src/app/core/services/language.service';


@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  providers: [MapDataService]
})
export class MapModalComponent implements OnInit, OnDestroy {
  @Input() showModal: boolean = false;
  @Input() stationId?: number; // Change locationNo to stationId
  public jsonData: any[] = [];
  @Output() closeModalEvent = new EventEmitter();
  public locationData: LocationData[] = [];
  public stationIdNum: number = 0; // Initialize with a default value
  private locationDataSubscription!: Subscription;
  currentLanguage!: string;
  translations = this.languageService.translations
  constructor(private modalService: ModalService, private mapDataService: MapDataService, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.locationDataSubscription = this.modalService.locationData$.subscribe(
      (stationId) => { // Change locationNumber to stationId
        // Convert stationId to number
        this.stationIdNum = Number(stationId); // Change locationNumberNum to stationIdNum
        this.locationData = this.jsonData.filter(item => item.id === this.stationIdNum); // Change location_no to id
        console.log(this.stationIdNum);
      }
    );
  

    this.mapDataService.getMapData().subscribe(data => {
      this.jsonData = data;
      console.log('Camera locations fetched successfully:', this.jsonData);
    });

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  
  ngOnDestroy(): void {
    this.locationDataSubscription.unsubscribe();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  isPlayerLarger: boolean[] = [false, false, false, false];

  togglePlayerSize(index: number): void {
    this.isPlayerLarger[index] = !this.isPlayerLarger[index];
  }
}
