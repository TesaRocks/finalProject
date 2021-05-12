import { IUser } from "./user.interface";

export class UserService {
  private users: IUser[] = [];

  public getAll() {
    return this.users;
  }
  public getUser(index: number) {
    return this.users[index];
  }
  public save(user: IUser) {
    this.users.push(user);
    return user;
  }
  public updateUser(index: number, user: IUser) {
    this.users[index] = user;
    return this.users[index];
  }
  public removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
