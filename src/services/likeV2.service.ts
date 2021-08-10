import { LikeRepository } from "../repositories/like.repository";

export class LikeV2Service {
  private likeRepository: LikeRepository;
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  public async getLikesByUserId(userId: number) {
    return await this.likeRepository.getLikesByUserId(userId);
  }
  public async newLike(productId: number, userId: number) {
    return await this.likeRepository.newLike(productId, userId);
  }
  public async deleteLike(productId: number, userId: number) {
    return await this.likeRepository.deleteLike(productId, userId);
  }
}
