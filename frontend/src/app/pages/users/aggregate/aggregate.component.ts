import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent implements OnInit {

  users: User[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsersFilters().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleFilterAggregate(bigger: number, less: number): void {
    this.userService.getUsersFilters(bigger, less).subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }

}
