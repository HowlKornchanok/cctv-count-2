import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDataService } from '../../main/map/services/map-data.service';
import { LargerSizeComponent } from './larger-size/larger-size.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-camera',
  standalone: true,
  imports: [CommonModule,LargerSizeComponent,FormsModule],
  templateUrl: './all-camera.component.html',
  styleUrl: './all-camera.component.scss',
  providers: [MapDataService]
})
export class AllCameraComponent  implements OnInit{
  public allLocations: any[] = []; // Define allLocations property  

  constructor(private mapDataService: MapDataService) { }

  ngOnInit(): void {
    this.mapDataService.getMapData().subscribe(data => {
      // Extract all locations with their cameras
      this.allLocations = data;
    });
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
}
