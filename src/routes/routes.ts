import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CaptchaService } from "../services/captchaService";
import { Logger } from "pino";

export function getRoutes(captchaService: CaptchaService, logger: Logger) {

    const plugin: FastifyPluginAsyncTypebox = async function (fastify) {

        fastify.get('/generate', async () => {

            logger.info('generating captcha...')

            const generatedCaptcha = await captchaService.generate();

            logger.info('generated captcha: ', generatedCaptcha.captchaDataUrl)

            return {
                captchaValue: generatedCaptcha.captchaDataUrl,
                captchaId: generatedCaptcha.captchaId
            }
        });
    }

    return plugin;
}