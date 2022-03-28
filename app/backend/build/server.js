"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = require("./app");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3001;
new app_1.App().start(PORT);
//# sourceMappingURL=server.js.map