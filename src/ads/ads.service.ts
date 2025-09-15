import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ad } from "./entities/ad.entity";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad) private adsRepo: Repository<Ad>,
  ) {}

  async findAllActive(): Promise<Ad[]> {
    return this.adsRepo.find({
      where: { active: true },
      order: { createdAt: "DESC" },
    });
  }

  async create(imageUrl: string): Promise<Ad> {
    const ad = this.adsRepo.create({ imageUrl });
    return this.adsRepo.save(ad);
  }

  async remove(id: string): Promise<void> {
    const result = await this.adsRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException("Ad not found");
  }
}
