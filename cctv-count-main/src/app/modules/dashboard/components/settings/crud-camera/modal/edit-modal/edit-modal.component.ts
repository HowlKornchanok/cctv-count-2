import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraDataService } from 'src/app/core/services/camera-data.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
  providers: [CameraDataService]
})
export class EditModalComponent implements OnInit {
  @Input() camera: any; // Input for camera data
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedCamera: any;

  constructor(
    private cameraDataService: CameraDataService, 
  ) { }

  ngOnInit(): void {
    // Initialize editedCamera with a copy of the original camera data
    this.editedCamera = { ...this.camera };
  }

  saveChanges(): void {
    this.saveChangesAction.emit(this.editedCamera);
  }

  cancel(): void {
    this.cancelAction.emit();
  }
}