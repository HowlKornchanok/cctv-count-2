import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationDataService } from 'src/app/core/services/station-data.service';
import { CameraDataService } from 'src/app/core/services/camera-data.service';

interface StationData {
  id: string;
  station_name: string;
  collapsed: boolean; // Define the collapsed property
}

@Component({
  selector: 'app-all-camera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-camera.component.html',
  styleUrls: ['./all-camera.component.scss'],
  providers: [StationDataService, CameraDataService]
})
export class AllCameraComponent implements OnInit {
  public stationDataList: StationData[] = [];
  public cameraData: any[] = [];

  constructor(
    private stationDataService: StationDataService,
    private cameraDataService: CameraDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.stationDataService.getStationData().subscribe(
      (response) => {
        this.stationDataList = response.msg.map((station: StationData) => ({
          ...station,
          collapsed: true // Set collapsed to true by default
        }));

        this.stationDataList.forEach((stationData: StationData) => {
          const stationId = stationData.id;

          this.cameraDataService.getCameraList(stationId).subscribe((data) => {
            if (data.msg.length > 0) {
              this.cameraData = this.cameraData.concat(data.msg);
            } else {
            }
          });
        });
      },
      (error) => {
        console.error('Error loading station data:', error);
      }
    );
  }

  showModal: boolean = false;
  selectedCamera: any;

  openModal(camera: any) {
    this.selectedCamera = camera;
    this.showModal = true;
    console.log('work');
  }

  closeModal() {
    this.showModal = false;
  }

  toggleCollapse(station: StationData): void {
    station.collapsed = !station.collapsed;
  }

  getCamerasForStation(stationId: string): any[] {
    return this.cameraData.filter((camera) => camera.station_id === stationId);
  }
}
