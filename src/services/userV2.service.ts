import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../services/user.interface";

export class UserV2Service {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAll() {
    return await this.userRepository.getUsers();
  }
  public async getUser(index: number) {
    return await this.userRepository.getUser(index);
  }
  public async save(user: IUser) {
    return await this.userRepository.save(user);
  }
  // public updateUser(index: number, user: IUser) {
  //   this.users[index] = user;
  //   return this.users[index];
  // }
  // public removeUser(index: number) {
  //   this.users.splice(index, 1);
  // }
}
