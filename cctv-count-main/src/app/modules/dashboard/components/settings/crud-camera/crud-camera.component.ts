import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';
import { CameraDataService } from 'src/app/core/services/camera-data.service';
import { StationDataService } from 'src/app/core/services/station-data.service';

interface StationData {
  id: string; 
}
@Component({
  selector: '[crud-camera]',
  standalone: true,
  imports: [CommonModule, FormsModule,EditModalComponent],
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
  public newCamera: any = {
    name: '',
    port: '',
    csn: '',
    url: '',
    sid: ''
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
              console.log(`Camera data for station ${stationId}:`, this.cameraData);
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
    console.log("Editing camera:", camera);
    this.selectedCamera = camera;
    this.showEditModal = true;
  }
  

  saveChanges(editedCamera: any): void {
    console.log("Saving changes for camera:", editedCamera);
    this.showEditModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  openModal() {
    this.showModal = true;
  }
  openModalnew () {
    this.selectedCamera = this.newCamera
    console.log(this.selectedCamera);
    this.showEditModal = true;
    
  }
  // Method to close the modal
  closeModal() {
    this.showModal = false;
  }

  getCameraCount(stationId: string): number {
    return this.cameraData.filter(camera => camera.station_id === stationId).length;
  }
  
  getCamerasForStation(stationId: string): any[] {
    return this.cameraData.filter(camera => camera.station_id === stationId);
  }

  addCamera(newCamera: any): void {
    console.log("Adding new camera:", newCamera);
    // Make HTTP request to add the new camera
    // Upon success, add the new camera to the cameraData array
    this.cameraData.push(newCamera);
  }

  // Method to update an existing camera
  updateCamera(updatedCamera: any): void {
    console.log("Updating camera:", updatedCamera);
    // Make HTTP request to update the existing camera
    // Upon success, update the cameraData array with the updated camera information
    const index = this.cameraData.findIndex(camera => camera.id === updatedCamera.id);
    if (index !== -1) {
      this.cameraData[index] = updatedCamera;
    }
  }

  // Method to delete a camera
  deleteCamera(cameraToDelete: any): void {
    console.log("Deleting camera:", cameraToDelete);
    // Make HTTP request to delete the camera
    // Upon success, remove the camera from the cameraData array
    this.cameraData = this.cameraData.filter(camera => camera.id !== cameraToDelete.id);
  }



}