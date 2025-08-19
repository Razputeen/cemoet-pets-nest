import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post('')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // folder tempat simpan file
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        cb(new Error('Only image files are allowed!'), false);
      } else {
        cb(null, true);
      }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }
}
