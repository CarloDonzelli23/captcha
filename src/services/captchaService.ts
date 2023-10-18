import Captcha from "captcha-generator-alphanumeric";
import { randomUUID } from "crypto";
import { RedisRepository } from "../repository/redisRepository";

export class CaptchaManager {

    private redisRepository: RedisRepository;

    constructor(redisRepository: RedisRepository) {
        this.redisRepository = redisRepository;
    }

    async generate() {
        const captcha = new Captcha();
        const captchaId = randomUUID();

        await this.redisRepository.set(captchaId, captcha.dataURL);

        return {
            captchaDataUrl: captcha.dataURL,
            captchaId: captchaId
        }
    }
}