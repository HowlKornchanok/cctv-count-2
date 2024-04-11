import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  selector: '[crud-user]',
  standalone: true,
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss'],
  imports: [CommonModule, FormsModule, UserEditModalComponent, UserAddModalComponent],
  providers: [UserService]
})
export class CrudUserComponent implements OnInit {
  public users: user[] = [];
  public showModal: boolean = false;
  public selectedUser: any = {};
  public isNewUser: boolean = false;
  public showEditModal: boolean = false;
  public showAddModal: boolean = false;
  public newUser: any = {
    uname: '',
    ukey: '',
    role: '',
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
          // Handle invalid response format
        }
      },
      (error) => {
        // Handle error here
      }
    );
  }
  

  saveAdd(newUser: any): void {
    this.userService.addNewUser(
      newUser.uname,
      newUser.ukey,
      newUser.role,
      newUser.fullName,
      newUser.lastName,
      newUser.address,
      newUser.email
    )
      .subscribe(
        (response) => {
          if (response && response.status === 200) {
            this.loadData();
          } 
        }
      );
    this.showAddModal = false;
  }

  deleteUser(selectedUserId: number): void {
    this.userService.deleteUser(selectedUserId).subscribe();
  }

  saveChanges(editedUser: any): void {
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
