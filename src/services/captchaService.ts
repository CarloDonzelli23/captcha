import Captcha from "captcha-generator-alphanumeric";
import * as crypto from 'crypto'

export class CaptchaManager {

    async generate() {
        const captcha = new Captcha();
        const captchaId = crypto.randomUUID();

        return {
            captchaDataUrl: captcha.dataURL,
            captchaId: captchaId
        }
    }
}