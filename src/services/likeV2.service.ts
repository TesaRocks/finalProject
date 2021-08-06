import { LikeRepository } from "../repositories/like.repository";

export class LikeV2Service {
  private likeRepository: LikeRepository;
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  public async getLikesByUserId(userId: number) {
    return await this.likeRepository.getLikesByUserId(userId);
  }
}
