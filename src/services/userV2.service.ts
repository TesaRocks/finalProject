import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../services/user.interface";
import { IProduct } from "../services/product.interface";

export class UserV2Service {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAll() {
    return await this.userRepository.getUsers();
  }
  public async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }
  public async save(user: IUser) {
    return await this.userRepository.save(user);
  }
  public async updateUser(id: number, user: IUser) {
    return await this.userRepository.updateUser(id, user);
  }
  public async removeUser(id: number) {
    return await this.userRepository.removeUser(id);
  }
  public async getAllProducts() {
    return await this.userRepository.getProducts();
  }
}
