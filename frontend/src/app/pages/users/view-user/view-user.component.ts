import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  users: User[];
  user: User[];

  selectedUserId: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.userId) {
        this.selectedUserId = params.userId;
        this.userService.getUserDetails(params.userId).subscribe((user: User[]) => {
          this.user = user;
        });
      } else {
        this.user = undefined;
      }
    });

    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });

  }

  handleFilterUser(word: string): void {
    this.userService.getUsersSearch(word).subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handlePaginateUsers(page: number): void {
    this.userService.getUsers(page).subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleUpdateUser(name: string, age: number, email: string): void {
    this.userService.updateUser(this.selectedUserId, name, age, email).subscribe();
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleDeleteUser(): void {
    this.userService.deleteUser(this.selectedUserId).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }

}
