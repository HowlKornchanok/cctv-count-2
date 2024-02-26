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
    const maxId = this.users.reduce((max, user) => {
      return Math.max(max, parseInt(user.id));
    }, 0);
  
    // Create a dummy user locally
    const dummyUser = {
      id: (maxId + 1).toString(), 
      username: 'newUser',
      role: 'user',
      password: '12345678'
    };

    this.users.push(dummyUser);
    this.http.post('http://localhost:3000/users', this.selectedUser).subscribe(() => {
        this.loadData();
      });
    this.selectUser(dummyUser);
  }
  
  saveUser(): void {
    if (this.isNewUser) {
      this.http.post('http://localhost:3000/users', this.selectedUser).subscribe(() => {
        this.loadData();
      });
    } else {
      this.http.put(`http://localhost:3000/users/${this.selectedUser.id}`, this.selectedUser).subscribe(() => {
        this.loadData();
      });
    }
    this.showEditModal = false;
  }

  editUser(user: any): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  saveChanges(editedUser: any): void {
    this.http.put(`http://localhost:3000/users/${editedUser.id}`, editedUser).subscribe(() => {
      this.loadData(); 
    });
    this.showEditModal = false;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteUser(user: any): void {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      this.http.delete(`http://localhost:3000/users/${user.id}`).subscribe(() => {
        this.loadData(); 
      });
    }
  }
}
