import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
// import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  handleCreateUser(name: string, age: number, email: string, password: string): void {
    this.userService.createUser(name, age, email, password).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
