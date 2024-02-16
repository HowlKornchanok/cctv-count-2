import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDataService } from '../../main/map/services/map-data.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { FormsModule } from '@angular/forms';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';

@Component({
  selector: '[crud-camera]',
  standalone: true,
  imports: [CommonModule, FormsModule,EditModalComponent],
  templateUrl: './crud-camera.component.html',
  styleUrl: './crud-camera.component.scss',
  providers: [MapDataService]
})
export class CRUDCameraComponent {

  public jsonData: any[] = [];
  public selectedCamera: any = {}; // Used for editing or viewing a single camera
  public isNewCamera: boolean = false; // Flag to indicate if the selected camera is new or existing
  public showEditModal: boolean = false;

  currentLanguage: string = 'th';
  translations = this.languageService.translations

  constructor(private cameraLocationService: MapDataService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.loadData();
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  private loadData(): void {
    this.cameraLocationService.getMapData().subscribe((data) => {
      this.jsonData = data;
    });
  }


  selectCamera(camera: any): void {
    this.selectedCamera = { ...camera }; // Copy camera object to selectedCamera
    this.isNewCamera = false; // Not a new camera
  }

  public addCamera(location: any): void {
    if (!location) {
      console.log("Invalid location provided.");
      return;
    }
  
    // Generate a new camera object with default values
    const newCamera = {
      camera_no: this.getNextCameraNumber(location), // Get the next available camera number for the location
      status: 'active', // Default status
      days_after_last_maintenance: 0, // Default days after last maintenance
      streaming_link: '' // Default streaming link
    };
  
    // Add the new camera to the specified location's cameras array
    location.cameras.push(newCamera);
    console.log("Camera added successfully to", location.location_name);
  }
  
  // Helper function to get the next available camera number for a specific location
  private getNextCameraNumber(location: any): number {
    let maxCameraNumber = 0;
    for (let camera of location.cameras) {
      maxCameraNumber = Math.max(maxCameraNumber, camera.camera_no);
    }
    return maxCameraNumber + 1; // Increment the max camera number by 1 to get the next available camera number
  }
  
  saveCamera(): void {
    // Logic to save the camera goes here
    if (this.isNewCamera) {
      // Logic to add new camera
    } else {
      // Logic to update existing camera
    }
  }

  editCamera(camera: any): void {
    console.log("Editing camera:", camera);
    this.selectedCamera = camera;
    this.showEditModal = true;
  }

  saveChanges(editedCamera: any): void {
    console.log("Saving changes for camera:", editedCamera);
    // Update the original camera data with editedCamera data
    // Add your logic to update the camera data in jsonData array
    this.showEditModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }
  
  public deleteCamera(camera: any): void {
    const confirmed = confirm("Are you sure you want to delete this camera?");
    if (confirmed) {
      console.log("Deleting camera:", camera);
  
      for (let location of this.jsonData) {
        const index = location.cameras.findIndex((c: any) => c === camera);

        if (index !== -1) {
          // Remove the camera from the location's cameras array
          location.cameras.splice(index, 1);
          return; // Exit the loop after deleting the camera
        }
      }
    }
  }
}