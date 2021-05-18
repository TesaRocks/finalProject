import { makeDb } from "../repositories/makeDb";
import { UserRepository } from "../repositories/user.repository";

export class UserV2Service {
  private userRepository: UserRepository;
  constructor() {
    const config = {
      host: "127.0.0.1",
      port: 3307,
      user: "user",
      password: "password",
      database: "db",
    };
    const db = makeDb(config);

    this.userRepository = new UserRepository(db);
  }

  public async getAll() {
    return await this.userRepository.getUsers();
  }
  public getUser(index: number) {}
  //public save(user: IUser) {}
  //public updateUser(index: number, user: IUser) {
  //}
  public removeUser(index: number) {}
}
