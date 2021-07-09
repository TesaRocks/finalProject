import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../services/product.interface";

export class ProductV2Service {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  public async getAllProductsPaginated(pageNumber: number) {
    return await this.productRepository.getProductsPaginated(pageNumber);
  }
  public async getProducts() {
    return await this.productRepository.getProducts();
  }
  public async getProductById(id: number) {
    return await this.productRepository.getProductById(id);
  }

  public async saveProduct(product: IProduct) {
    return await this.productRepository.saveProduct(product);
  }
  public async updateProduct(productId: number, product: IProduct) {
    return await this.productRepository.updateProduct(productId, product);
  }
  public async removeProduct(productId: number) {
    return await this.productRepository.removeProduct(productId);
  }
}
