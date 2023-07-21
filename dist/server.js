"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("./config/corsOptions");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const credentials_1 = require("./middleware/credentials");
const dbConnect_1 = require("./config/dbConnect");
const port = process.env.PORT || 3002;
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const logout_1 = __importDefault(require("./routes/logout"));
const users_1 = __importDefault(require("./routes/api/users"));
const boards_1 = __importDefault(require("./routes/api/boards"));
const groups_1 = __importDefault(require("./routes/api/groups"));
const tasks_1 = __importDefault(require("./routes/api/tasks"));
const teams_1 = __importDefault(require("./routes/api/teams"));
(0, dbConnect_1.connectDB)();
app.use(credentials_1.credentials);
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
app.use('/users', users_1.default);
app.use('/boards', boards_1.default);
app.use('/groups', groups_1.default);
app.use('/tasks', tasks_1.default);
app.use('/teams', teams_1.default);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`server run on port ${port}`);
});
