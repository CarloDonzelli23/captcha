import { RedisRepository } from "../src/repository/redisRepository";

const redisUrl = 'redis://localhost:6379';
const redisRepository = new RedisRepository(redisUrl);

test('integration', async () => {

    await redisRepository.set('myKey', 'value1');
    const redisValue = await redisRepository.get('myKey');

    expect(redisValue).toEqual('value1');
});


afterAll(async () => {

    await redisRepository.clean();
    await redisRepository.stop();
});