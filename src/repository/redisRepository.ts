import { createClient, RedisClientType } from 'redis';

export class RedisRepository {

    private client: RedisClientType;
    private redisConnectionString: string;

    constructor(redisConnectionString: string) {
        this.redisConnectionString = redisConnectionString;

        this.client = createClient({
            url: redisConnectionString
        });

        this.client.on('error', (err) => {
            console.log('Redis client error', err);
        });

        this.client.connect();
    }

    async set(key: string, value: string) {
        await this.client.set(key, value);
    }

    async get(key: string) {
        const value = await this.client.get(key);
        return value;
    }

    async clean() {
        //The FLUSHDB command deletes the keys in a redis database
        await this.client.flushDb();
    }

    async stop() {
        await this.client.quit();
    }
}