import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}
  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File not provided");
    }

    const savedFile = await this.prisma.file.create({
      data: {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    return {
      message: "File uploaded successfully",
      data: savedFile,
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
