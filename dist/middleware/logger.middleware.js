"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
function logger(req, res, next) {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map