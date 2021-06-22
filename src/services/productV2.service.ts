import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../services/product.interface";

export class ProductV2Service {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  public async getAllProducts() {
    return await this.productRepository.getProducts();
  }
  public async getProductById(id: number) {
    return await this.productRepository.getProductById(id);
  }
  public async saveProduct(product: IProduct, id: number) {
    return await this.productRepository.saveProduct(product, id);
  }
  public async updateProduct(id: number, product: IProduct) {
    return await this.productRepository.updateProduct(id, product);
  }
}
