import { RedisRepository } from "./repository/redisRepository";
import { CaptchaService } from "./services/captchaService";
import { ServerService } from "./services/serverService";
import { getRoutes } from "./routes/routes";
import pino from 'pino';
import { config } from 'dotenv';

config();

const logger = pino({ level: 'info' });
const redisRepository = new RedisRepository(process.env.REDIS_CONNECTION_STRING ?? 'redis://localhost:6379');
const captchaService = new CaptchaService(redisRepository);
const server = new ServerService(Number(process.env.SERVER_PORT) || 3000, logger);

server.registerRoutes(getRoutes(captchaService, logger));
server.start();

process.on('SIGINT', async () => {
    logger.info("exit...")
    await redisRepository.stop();
    await server.stop();
});