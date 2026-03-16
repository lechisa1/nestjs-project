import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadService } from "./upload.service";
import { multerConfig } from "./multer.config";
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file",multerConfig))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file);
  }
}
