import { CaptchaService } from "./services/captchaService";
import { ServerService } from "./services/serverService";
import { getRoutes } from "./routes/routes";
import pino from 'pino';

const logger = pino({ level: 'info' });

const captchaService = new CaptchaService()
const server = new ServerService(3000, logger);

server.registerRoutes(getRoutes(captchaService, logger));
server.start();