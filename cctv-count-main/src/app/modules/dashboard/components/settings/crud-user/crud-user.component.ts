import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from './modal/user-edit-modal/user-edit-modal.component';
import { UserService } from 'src/app/core/guards/user.service';
import { UserAddModalComponent } from './modal/user-add-modal/user-add-modal.component';
import { UserData,NewUserData } from 'src/app/core/interfaces/user-data.interface';
@Component({
  selector: '[crud-user]',
  standalone: true,
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss'],
  imports: [CommonModule, FormsModule, UserEditModalComponent, UserAddModalComponent],
  providers: [UserService]
})

export class CrudUserComponent implements OnInit {
  public users: UserData[] = [];
  public showModal: boolean = false;
  public selectedUser: any = {};
  public isNewUser: boolean = false;
  public showEditModal: boolean = false;
  public showAddModal: boolean = false;
  public newUser: NewUserData = {
    uname: '',
    ukey: '',
    role: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    is_enable: 'true',
  };
  private loggedInUser = sessionStorage.getItem('uname');
  private loggedInID = sessionStorage.getItem('userID');
  
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
          // Handle invalid response format
        }
      },
      (error) => {
        // Handle error here
      }
    );
  }
  

  saveAdd(newUser: NewUserData): void {
    this.userService.addNewUser(newUser)
      .subscribe(
        (response) => {
          if (response) {
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
  

  deleteUser(selectedUserId: number, selectedUserName: string): void {
    if (selectedUserName !== this.loggedInUser && selectedUserName !== this.loggedInID ){
      this.userService.deleteUser(selectedUserId,selectedUserName).subscribe();
    }else{
      alert("You can't delete yourself");
    }
    this.loadData();
  }

  saveChanges(editedUser: any): void {
    this.userService.updateUser(editedUser).subscribe(
      (response) => {
        if (response) {
          this.loadData();
          this.showEditModal = false; 
        } else {

          this.loadData();
          this.showEditModal = false;
        }
      },
      (error) => {
        this.showEditModal = false;
      }
    );
    this.showAddModal = false;
  }
  

  openEditModal(user: any): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.showAddModal = false;
    this.loadData();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadData();
    
  }

  openModalnew () {
    this.selectedUser = this.newUser
    this.showAddModal = true;
  }

}
