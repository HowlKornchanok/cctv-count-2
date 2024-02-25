import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserEditModalComponent } from './modal/user-edit-modal/user-edit-modal.component';

@Component({
  selector: '[crud-user]',
  standalone: true,
  imports: [CommonModule,FormsModule,UserEditModalComponent],
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.scss'
})
export class CrudUserComponent implements OnInit {
  public users: any[] = [];
  public selectedUser: any = {};
  public isNewUser: boolean = false;
  public showEditModal: boolean = false;
  public showModal: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
      this.users = data;
    });
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user };
    this.isNewUser = false;
  }
  addUser(): void {
    this.isNewUser = true;
    this.selectedUser = {}; // Clear selected user data
    this.showEditModal = true;
    this.users.push({});
  }

  saveUser(): void {
    if (this.isNewUser) {
      this.users.push(this.selectedUser);
    } else {
    }
    this.showEditModal = false;
  }

  editUser(user: any): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }


  saveChanges(editedUser: any): void {
    // Logic to save changes for user goes here
    this.showEditModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  public deleteUser(user: any): void {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
  }
}