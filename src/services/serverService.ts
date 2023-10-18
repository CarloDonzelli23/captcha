import Fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { Logger } from 'pino';

export class ServerService {

    private fastify: FastifyInstance;
    private port: number;
    private logger: Logger;

    constructor(port: number, logger: Logger) {

        this.fastify = Fastify({
            logger: true
        });

        this.port = port;
        this.logger = logger;
    }

    async start() {
        try {
            this.logger.info('starting server on port: ', this.port);
            await this.fastify.listen({ port: this.port, host: '0.0.0.0' });
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    registerRoutes(plugin: FastifyPluginCallback) {
        this.fastify.register(plugin);
    }

    async stop() {
        await this.fastify.close();
    }
}