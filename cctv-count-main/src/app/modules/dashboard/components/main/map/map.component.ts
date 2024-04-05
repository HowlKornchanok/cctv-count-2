import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls} from 'ol/control.js';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ZoomToCentralPin } from './zoomto-central-pin/zoomto-central-pin.component';
import { ModalService } from './services/modal.service';

import { Subscription } from 'rxjs';
import { StationDataService } from 'src/app/core/services/station-data.service';
import { CameraDataService } from 'src/app/core/services/camera-data.service';
@Component({
  selector: '[map]',
  standalone: true,
  imports: [CommonModule,MapModalComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [StationDataService,CameraDataService]
})
export class MapComponent implements OnInit,OnDestroy {
  map!: Map;
  public showModal: boolean = false;
  public jsonData: any[] = [];
  @ViewChild(MapModalComponent) mapModalComponent!: MapModalComponent;
  private dataServiceSubscription: Subscription | undefined;
  ngOnDestroy(): void {

    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  constructor(
    private modalDataService: ModalService,
    private stationDataService: StationDataService ) {}

    getCenterCoordinates(stationData: any[]): number[] {
      if (stationData.length === 0) {
        return [0, 0]; // Default coordinates if no station data available
      }
      const totalLat = stationData.reduce((sum, station) => sum + station.lat, 0);
      const totalLon = stationData.reduce((sum, station) => sum + station.lon, 0);
      const avgLat = totalLat / stationData.length;
      const avgLon = totalLon / stationData.length;
      return [avgLon, avgLat];
    }
    
    ngOnInit(): void {
      this.stationDataService.getStationData().subscribe(
        (response) => {
          const stationData = response.msg;
    
          this.map = new Map({
            controls: defaultControls(),
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            target: 'map',
            view: new View({
              center: fromLonLat(this.getCenterCoordinates(stationData)),
              zoom: 12.6,
              maxZoom: 20,
            }),
          });
    
          // Add pins for each station location
          stationData.forEach((station: any) => {
            const coordinates = [station.lon, station.lat];
            const id = station.id;
            this.addPin(id,coordinates, station.station_name);
          });
    
          // Create ZoomToCentralPin control after map initialization
          const zoomControl = new ZoomToCentralPin(this.map, this.getCenterCoordinates(stationData));
          this.map.addControl(zoomControl);
        },
        (error) => {
          console.error('Failed to fetch station data:', error);
        }
      );
    }
    
  
  

  loadStationData(): void {
    // Call the method to get station data from StationDataService
    this.stationDataService.getStationData().subscribe(
      (data) => {
        // Handle the retrieved station data
        console.log('Station data:', data);
        // Process the data as needed, e.g., add pins to the map
      },
      (error) => {
        // Handle errors if any
        console.error('Failed to fetch station data:', error);
      }
    );
  }

  
  
  addPin(id: number,coordinates: number[], label: string): void {
    const pinElement = this.createPinElement(label);
    const pinText = this.createPinText(label);

    const pinOverlay = new Overlay({
      position: fromLonLat(coordinates),
      positioning: 'center-center',
      element: pinElement,
      stopEvent: false,
    });


    const TextOverlay = new Overlay({
      position: fromLonLat(coordinates),
      positioning: 'center-center',
      element: pinText,
      stopEvent: false,
    });

    pinElement.addEventListener('click', () => {
        this.openMapModal(id);
    });
    
    
    

    this.map.addOverlay(pinOverlay);
    this.map.addOverlay(TextOverlay);

  }
  createPinText(label: string): HTMLElement {
    const pinText = document.createElement('div');
    pinText.className = 'pin-label';
    pinText.innerHTML = `<div class="pin-label" style="font-weight: bold;">${label}</div>`;
    pinText.style.marginBottom ='40px';
    return pinText;
  }

  createPinElement(label: string): HTMLElement {
    const pinElement = document.createElement('div');

    pinElement.className = 'pin';
    pinElement.innerHTML = '<img src="/assets/icons/map-pin-30.png" class="pin-icon" />'
    const pinText = document.createElement('div');

    pinText.style.position = 'center';
    
    pinElement.appendChild(pinText);

    return pinElement;
  }

  

  

  zoomToPin(coordinates: number[]): void {
    this.map.getView().animate({
      center: fromLonLat(coordinates),
      zoom: 18,
      duration: 1000,
    });
  }

  openMapModal(stationID: any): void {
    this.showModal = true;
    this.modalDataService.setCameraData(stationID); 
  }
  
  

  closeModal() {
    this.showModal = false;
  }

}