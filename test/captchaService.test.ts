import { RedisRepository } from "../src/repository/redisRepository";
import { CaptchaService } from "../src/services/captchaService";
import * as crypto from 'crypto';

const redisRepository = {
    set: jest.fn(),
    get: jest.fn().mockResolvedValue('test')
} satisfies Partial<RedisRepository>;

const id = crypto.randomUUID();
const captchaService = new CaptchaService(redisRepository as any, () => id as any);

test('generate', async () => {

    const captcha = await captchaService.generate();

    expect(captcha.captchaId).toEqual(id);

    expect(redisRepository.set).toBeCalledWith(id, expect.any(String));

});

test.each([{ result: true, input: 'test0', output: 'test0' }, { result: false, input: 'test0', output: 'test1' }])(
    'testVerify $result', async ({ result, input, output }) => {

        redisRepository.get.mockResolvedValue(input);
        const verify = await captchaService.verify(id, output);

        expect(redisRepository.get).toBeCalledWith(id);
        expect(verify).toEqual(result)
        expect(redisRepository.get).toBeCalledTimes(1);
    }
);

afterEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
});