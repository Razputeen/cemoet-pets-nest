import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { AdsService } from "./ads.service";

@Controller("ads")
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  findAll() {
    return this.adsService.findAllActive();
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./uploads/ads",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `/uploads/ads/${file.filename}`;
    return this.adsService.create(imageUrl);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adsService.remove(id);
  }
}
