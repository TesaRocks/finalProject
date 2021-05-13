import { UserRepository } from "../repositories/user.repository";
import { IUser } from "./user.interface";

export class UserV2Service {
  private users: IUser[] = [];

  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public getAll() {
    this.userRepository.getUsers();
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
