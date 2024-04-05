import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/guards/user.service';


@Component({
  selector: 'app-user-add-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-add-modal.component.html',
  styleUrl: './user-add-modal.component.scss',
  providers: [UserService]
})
export class UserAddModalComponent {
  @Input() newUser: any; 
  @Output() saveChangesAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedUser: any;

  constructor(
    private userService: UserService, 
  ) { }

  ngOnInit(): void {
    this.editedUser = { ...this.newUser };
  }

  saveChanges(): void {
    this.saveChangesAction.emit(this.newUser);
  }

  cancel(): void {
    this.cancelAction.emit();
  }
}