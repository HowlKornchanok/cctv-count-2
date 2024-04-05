import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraDataService } from 'src/app/core/services/camera-data.service';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
  providers: [CameraDataService]
})
export class AddModalComponent implements OnInit {
  @Input() newCamera: any; // Input for camera data
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedCamera: any;

  constructor(
    private cameraDataService: CameraDataService, 
  ) { }

  ngOnInit(): void {
    this.editedCamera = { ...this.newCamera };
  }

  saveChanges(): void {
    this.saveChangesAction.emit(this.newCamera);
  }

  cancel(): void {
    this.cancelAction.emit();
  }
}