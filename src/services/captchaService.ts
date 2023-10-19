import Captcha from "captcha-generator-alphanumeric";
import * as crypto from "crypto";
import { RedisRepository } from "../repository/redisRepository";

export class CaptchaService {

    private redisRepository: RedisRepository;
    private generateUUID: () => string

    constructor(redisRepository: RedisRepository, generateUUID = crypto.randomUUID) {
        this.redisRepository = redisRepository;
        this.generateUUID = generateUUID;
    }

    async generate() {
        const captcha = new Captcha();
        const captchaId = this.generateUUID();
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