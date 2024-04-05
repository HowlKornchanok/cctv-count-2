import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent implements OnInit {
  @Input() newCamera: any; // Input for camera data
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedCamera: any;

  constructor() { }

  ngOnInit(): void {
    // Initialize editedCamera with a copy of the original camera data
    this.editedCamera = { ...this.newCamera };
  }

  saveChanges(): void {
    // Emit the edited camera data to the parent component
    this.saveChangesAction.emit(this.newCamera);
  }

  cancel(): void {
    this.cancelAction.emit();
  }
}