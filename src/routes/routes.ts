import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { CaptchaService } from "../services/captchaService";
import { Logger } from "pino";

export function getRoutes(captchaService: CaptchaService, logger: Logger) {

    const plugin: FastifyPluginAsyncTypebox = async function (fastify) {

        const validateReponse = Type.Object({ captchaValue: Type.String(), captchaId: Type.String({ format: 'uuid' }) });

        fastify.get('/generate', {
            schema: {
                response: {
                    '2xx': validateReponse
                }
            }
        }, async () => {

            logger.info('generating captcha...');

            const generatedCaptcha = await captchaService.generate();

            return {
                captchaValue: generatedCaptcha.captchaDataUrl,
                captchaId: generatedCaptcha.captchaId
            }
        });

        const validateBody = Type.Object({ captchaId: Type.String({ format: 'uuid' }), userInput: Type.String() });

        fastify.post('/verify', {
            schema: {
                body: validateBody
            }
        }, async (req, res) => {

            const captchaId = req.body.captchaId;
            const captchaValue = req.body.userInput;

            logger.info('verifing captcha...');

            const verify = await captchaService.verify(captchaId, captchaValue);

            if (verify) {
                return res.status(200).send({ success: true, message: "valid captcha" });
            } else {
                return res.status(400).send({ success: false, message: "invalid captcha" });
            }
        });
    }

    return plugin;
}