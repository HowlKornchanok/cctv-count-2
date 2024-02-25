import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss'
})
export class UserEditModalComponent implements OnInit{

  @Input() user: any; // Updated input property name
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedUser: any; // Updated property name

  constructor() { }

  ngOnInit() {
    // Initialize editedUser with a copy of the original user data
    this.editedUser = { ...this.user }; // Updated property name
  }

  saveChanges() {
    // Emit the edited user data to the parent component
    this.saveChangesAction.emit(this.editedUser); // Updated property name
  }

  cancel() {
    this.cancelAction.emit();
  }
}