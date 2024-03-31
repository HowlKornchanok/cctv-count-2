import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from './modal/user-edit-modal/user-edit-modal.component';
import { UserService } from 'src/app/core/guards/user.service';

@Component({
  selector: '[crud-user]',
  standalone: true,
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss'],
  imports: [CommonModule, FormsModule, UserEditModalComponent],
  providers: [UserService]
})
export class CrudUserComponent implements OnInit {
  public users: any[] = [];
  public showModal: boolean = false;
  public selectedUser: any = {};
  public isNewUser: boolean = false;
  public showEditModal: boolean = false;


  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  private loadData(): void {
    this.userService.getUserList().subscribe(
      (response) => {
        if (response && response.status === 200 && response.msg) {
          this.users = response.msg; // Assigning the array of users to the component property
          console.log('Loaded data:', this.users); // Log the loaded data
        } else {
          console.error('Invalid response format:', response);
          // Handle invalid response format
        }
      },
      (error) => {
        console.error('Error loading user data:', error);
        // Handle error here
      }
    );
  }
  

  openEditModal(user: any): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    // Reload data after closing modal, if needed
    // this.loadData();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  
}
