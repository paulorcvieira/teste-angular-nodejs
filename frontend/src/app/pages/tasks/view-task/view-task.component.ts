import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  lists: Task[];
  tasks: List[];

  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          });
        } else {
          this.tasks = undefined;
        }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });

  }

  handleTaskCompleteChange(task: Task): void {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  handleDeleteList(): void {
    this.taskService.deleteList(this.selectedListId).subscribe(() => {
      this.router.navigate(['/lists']);
    });
  }

  handleDeleteTask(id: string): void {
    this.taskService.deleteTask(this.selectedListId, id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }

}
