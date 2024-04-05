import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { CameraDataService } from 'src/app/core/services/camera-data.service';

@Component({
  selector: 'app-map-modal',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  providers: [CameraDataService] 
})
export class MapModalComponent implements OnInit, OnDestroy {
  @Input() showModal: boolean = false;
  @Input() stationId?: number;
  public jsonData: any[] = [];
  @Output() closeModalEvent = new EventEmitter();
  public stationIdNum: number = 0; // Initialize with a default value
  private stationDataSubscription!: Subscription;
  currentLanguage!: string;
  translations = this.languageService.translations;
  
  constructor(
    private modalService: ModalService,
    private cameraDataService: CameraDataService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.stationDataSubscription = this.modalService.cameraData$.subscribe(
      (stationId) => {
        this.stationIdNum = Number(stationId);
        // Fetch camera data based on stationIdNum
        this.fetchCameraData(this.stationIdNum);
      }
    );
    
    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.stationDataSubscription.unsubscribe();
  }

  fetchCameraData(stationId: number): void {
    // Use the provided stationId to fetch camera data
    this.cameraDataService.getCameraList(stationId.toString()).subscribe(data => {
      this.jsonData = data.msg;

  });
  
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  isPlayerLarger: boolean[] = [false, false, false, false];

  togglePlayerSize(index: number): void {
    this.isPlayerLarger[index] = !this.isPlayerLarger[index];
  }
}
