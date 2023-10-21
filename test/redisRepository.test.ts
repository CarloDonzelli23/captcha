import { RedisRepository } from "../src/repository/redisRepository";
import pino from 'pino';

const logger = pino({ level: 'info' });
const redisUrl = 'redis://localhost:6379';
const redisRepository = new RedisRepository(redisUrl, logger);

test('integration', async () => {

    await redisRepository.set('myKey', 'value1');
    const redisValue = await redisRepository.get('myKey');

    expect(redisValue).toEqual('value1');
});


afterAll(async () => {

    await redisRepository.clean();
    await redisRepository.stop();
});