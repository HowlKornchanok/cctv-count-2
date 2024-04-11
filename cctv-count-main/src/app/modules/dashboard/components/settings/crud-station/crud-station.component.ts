import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from './modal/user-edit-modal/user-edit-modal.component';
import { UserService } from 'src/app/core/guards/user.service';
import { UserAddModalComponent } from './modal/user-add-modal/user-add-modal.component';


interface user {
  user_name: string;
  id: number;
  is_enable: boolean;
  role: number;
}
@Component({
  selector: '[crud-station]',
  standalone: true,
  templateUrl: './crud-station.component.html',
  styleUrls: ['./crud-station.component.scss'],
  imports: [CommonModule, FormsModule, UserEditModalComponent, UserAddModalComponent],
  providers: [UserService]
})
export class CrudStationComponent implements OnInit {
  public users: user[] = [];
  public showModal: boolean = false;
  public selectedUser: any = {};
  public isNewUser: boolean = false;
  public showEditModal: boolean = false;
  public showAddModal: boolean = false;
  public newUser: any = {
    fullName: '',
    lastName: '',
    address: '',
    email: '',
  };
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  private loadData(): void {
    this.userService.getUserList().subscribe(
      (response) => {
        if (response && response.status === 200 && response.msg) {
          this.users = response.msg; // Assigning the array of users to the component property
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
  

  saveAdd(newUser: any): void {
   
    this.showAddModal = false;
  }
  saveChanges(editedCamera: any): void {
    console.log(editedCamera)
    this.showEditModal = false;
  }
  

  openEditModal(user: any): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.showAddModal = false;
    // Reload data after closing modal, if needed
    // this.loadData();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    
  }

  openModalnew () {
    this.selectedUser = this.newUser
    this.showAddModal = true;
  }

}
