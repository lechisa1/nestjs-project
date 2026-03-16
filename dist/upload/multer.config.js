"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
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
//# sourceMappingURL=multer.config.js.map