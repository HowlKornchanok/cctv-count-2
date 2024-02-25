import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent implements OnInit{

  @Input() camera: any;
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedCamera: any;

  constructor() { }

  ngOnInit() {
    // Initialize editedCamera with a copy of the original camera data
    this.editedCamera = { ...this.camera };
  }

  saveChanges() {
    // Emit the edited camera data to the parent component
    this.saveChangesAction.emit(this.editedCamera);
  }

  cancel() {
    this.cancelAction.emit();
  }
}