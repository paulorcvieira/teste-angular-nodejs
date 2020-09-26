import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webReqService: WebRequestService) { }

  getUsers(page = 1) {
    return this.webReqService.get(`users?page=${page}`);
  }

  getUserDetails(userId: string) {
    return this.webReqService.get(`user/${userId}`);
  }

  getUsersFilters(bigger = 18, less = 60) {
    return this.webReqService.get(`filter?bigger=${bigger}&less=${less}`);
  }

  getUsersSearch(word: string) {
    return this.webReqService.get(`search?word=${word}`);
  }

  createUser(name: string, age: number, email: string, password: string) {
    return this.webReqService.post(`users`, { name, age, email, password });
  }

  updateUser(userId: string, name: string, age: number, email: string) {
    return this.webReqService.patch(`user/${userId}`, { name, age, email });
  }

  deleteUser(userId: string) {
    return this.webReqService.delete(`user/${userId}`);
  }
}
