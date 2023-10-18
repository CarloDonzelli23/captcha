import Fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';

export class ServerService {

    private fastify: FastifyInstance;
    private port: number;

    constructor(port: number) {

        this.fastify = Fastify({
            logger: true
        });

        this.port = port;
    }

    async start() {
        try {
            await this.fastify.listen({ port: this.port, host: '0.0.0.0' });
        } catch (error) {
            this.fastify.log.error(error);
            process.exit(1);
        }
    }

    async stop() {
        await this.fastify.close();
    }
}