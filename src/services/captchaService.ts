import Captcha from "captcha-generator-alphanumeric";
import { randomUUID } from "crypto";
import { RedisRepository } from "../repository/redisRepository";

export class CaptchaService {

    private redisRepository: RedisRepository;

    constructor(redisRepository: RedisRepository) {
        this.redisRepository = redisRepository;
    }

    async generate() {
        const captcha = new Captcha();
        const captchaId = randomUUID();

        await this.redisRepository.set(captchaId, captcha.value);

        return {
            captchaDataUrl: captcha.dataURL,
            captchaId: captchaId,
        }
    }

    async verify(captchaId: string, captchaValue: string) {
        const storedCaptcha = await this.redisRepository.get(captchaId);
        return captchaValue == storedCaptcha;
    }
}