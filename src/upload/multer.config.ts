import { diskStorage } from "multer";

export const multerConfig = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const unique = Date.now() + "-" + file.originalname;
      cb(null, unique);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
