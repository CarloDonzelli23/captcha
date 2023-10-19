import Fastify, { FastifyPluginCallback } from 'fastify';
import { Logger } from 'pino';

export class ServerService {

    private fastify;
    private port: number;

    constructor(port: number, logger: Logger | boolean) {

        this.fastify = Fastify({
            logger: logger
        });

        this.port = port;
    }

    async start() {
        try {
            this.fastify.log.info('starting server on port:' + this.port);
            await this.fastify.listen({ port: this.port, host: '0.0.0.0' });
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    registerRoutes(plugin: FastifyPluginCallback) {
        this.fastify.register(plugin);
    }

    addSwagger(fastifySwagger: any, fastifySwaggerUi: any, uiOptions: any) {
        this.fastify.register(fastifySwagger);
        this.fastify.register(fastifySwaggerUi, uiOptions);
    }

    async stop() {
        await this.fastify.close();
    }

    inject() {
        return this.fastify.inject();
    }
}