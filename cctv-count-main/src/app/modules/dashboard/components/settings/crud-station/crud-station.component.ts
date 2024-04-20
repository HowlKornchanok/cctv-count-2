import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationEditModalComponent } from './modal/user-edit-modal/station-edit-modal.component';
import { StationAddModalComponent } from './modal/station-add-modal/station-add-modal.component';
import { StationDataService } from 'src/app/core/services/station-data.service';
import { StationData } from 'src/app/core/interfaces/station-data.interface';

@Component({
  selector: '[crud-station]',
  standalone: true,
  templateUrl: './crud-station.component.html',
  styleUrls: ['./crud-station.component.scss'],
  imports: [CommonModule, FormsModule,StationEditModalComponent,StationAddModalComponent],
  providers: [StationDataService]
})
export class CrudStationComponent implements OnInit {
  public stationData: StationData[] = []; // Modify the type according to your station data interface
  public showModal: boolean = false;
  public selectedStation: any = {};
  public showEditModal: boolean = false;
  public showAddModal: boolean = false;
  public newStation: StationData = {
    st_id: '',
    st_name: '',
    lat: '',
    lon: '',
  }
  
  constructor(private stationDataService: StationDataService) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  private loadData(): void {
    this.stationDataService.getStationData().subscribe(
      (response) => {
        if (response && response.status === 200 && response.msg) {
          this.stationData = response.msg;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error loading station data:', error);
      }
    );
  }

  saveAdd(newStation: StationData): void {
    this.stationDataService.addNewStation(newStation).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          this.loadData();
          this.showAddModal = false; // Close the modal after successful addition
        } else {

          this.loadData();
          this.showAddModal = false;
        }
      },
      (error) => {
        this.showAddModal = false;
      }
    );
    this.showAddModal = false;
}
  
saveChanges(editedStation: StationData): void {
  this.stationDataService.updateStationData(editedStation).subscribe(
    (response) => {
      console.log("Station data updated successfully:", response);
      // Implement any additional logic if needed
      this.showEditModal = false; // Close the edit modal after successful update
    },
    (error) => {
      console.error("Failed to update station data:", error);
      // Handle error if needed
    }
  );
}


  openEditModal(station: StationData): void {
    this.selectedStation = station;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.showAddModal = false;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openModalnew(): void {
    // Assign new station data to selectedStation for add modal
    this.selectedStation = this.newStation;
    this.showAddModal = true;
  }

  deleteStation(station: StationData): void {
    if (confirm("Are you sure you want to delete this station?")) {
      this.stationDataService.deleteStationData(station).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error("Failed to delete station:", error);
        }
      );
    }
  }
  
}
