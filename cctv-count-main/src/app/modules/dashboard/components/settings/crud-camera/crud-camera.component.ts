import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';
import { CameraDataService } from 'src/app/core/services/camera-data.service';
import { StationDataService } from 'src/app/core/services/station-data.service';
import { AddModalComponent } from './modal/add-modal/add-modal.component';
interface StationData {
  id: string; 
}
interface newCamera {
  service_name: string,
  camera_port: number,
  camera_sn: number,
  camera_url: string,
  station_id: number
}
@Component({
  selector: '[crud-camera]',
  standalone: true,
  imports: [CommonModule, FormsModule,EditModalComponent,AddModalComponent],
  templateUrl: './crud-camera.component.html',
  styleUrl: './crud-camera.component.scss',
  providers: [CameraDataService,StationDataService]
})
export class CRUDCameraComponent implements OnInit{

  stationDataList: StationData[] = [];
  public cameraData: any[] = [];
  public selectedCamera: any = {}; // Used for editing or viewing a single camera
  public isNewCamera: boolean = false; // Flag to indicate if the selected camera is new or existing
  public showEditModal: boolean = false;
  public showModal: boolean = false;
  public showAddModal: boolean = false;

  public newCamera: any = {
    service_name: '',
    camera_port: '',
    camera_sn: '',
    camera_url: '',
    station_id: ''
    
  };
  


  currentLanguage: string = 'th';
  translations = this.languageService.translations

  constructor(
    private stationDataService: StationDataService,
    private cameraDataService: CameraDataService, 
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.loadData();
 
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  private loadData(): void {
    this.stationDataService.getStationData().subscribe(
      (response) => {
        this.stationDataList = response.msg; 
        
        this.stationDataList.forEach((stationData: StationData) => {
          const stationId = stationData.id;
          
          this.cameraDataService.getCameraList(stationId).subscribe((data) => {
            if (data.msg.length > 0) {
              // Merge or concatenate data instead of replacing
              this.cameraData = this.cameraData.concat(data.msg); // Concatenating data
            } else {
              console.log(`No camera data available for station ${stationId}`);
            }
          });
        });
      },
      (error) => {
        console.error('Error loading station data:', error);
      }
    );
  }
  

  editCamera(camera: any): void {
    this.selectedCamera = camera;
    this.showEditModal = true;
  }
  
  saveAdds(newCamera: any): void {
    console.log(newCamera)
    this.cameraDataService.addCameraService(newCamera.service_name, newCamera.camera_port, newCamera.camera_sn, newCamera.camera_url, newCamera.station_id);
    this.showAddModal = false;
    
  }
  saveChanges(editedCamera: any): void {
    console.log(editedCamera)
    this.showEditModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.showAddModal = false;
  }

  openModal() {
    this.showModal = true;
  }


  // Method to close the modal
  closeModal() {
    this.showModal = false;
    this.showAddModal = false;
  }

  getCameraCount(stationId: string): number {
    return this.cameraData.filter(camera => camera.station_id === stationId).length;
  }
  
  getCamerasForStation(stationId: string): any[] {
    return this.cameraData.filter(camera => camera.station_id === stationId);
  }

  addCamera(newCamera: any): void {

    
    this.cameraData.push(newCamera);
  }

  // Method to update an existing camera
  updateCamera(updatedCamera: any): void {
    console.log("Updating camera:", updatedCamera);
    const index = this.cameraData.findIndex(camera => camera.id === updatedCamera.id);
    if (index !== -1) {
      this.cameraData[index] = updatedCamera;
    }
  }

  // Method to delete a camera
  deleteCamera(cameraToDelete: any): void {

    this.cameraData = this.cameraData.filter(camera => camera.id !== cameraToDelete.id);
  }


  openModalnew () {
    this.selectedCamera = this.newCamera
    this.showAddModal = true;
  }



}