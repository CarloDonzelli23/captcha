import { ServerService } from "../src/services/serverService";
import { getRoutes } from "../src/routes/routes";
import { Logger } from 'pino';

const serverPort: number = 3000;

test('generate', async () => {

    const returnValue = {
        captchaDataUrl: '',
        captchaId: '8360d235-cc52-494f-ba86-a8de2b424eab'
    }

    const captchaService = {
        generate: jest.fn().mockResolvedValue(returnValue)
    }

    const server = new ServerService(serverPort, false);

    await server.registerRoutes(getRoutes(captchaService as any));

    const response = await server.inject().get('/generate');

    expect(response.statusCode).toBe(200);

    expect((response.json()).captchaId).toEqual(returnValue.captchaId);
    expect((response.json()).captchaValue).toEqual(returnValue.captchaDataUrl);
});

test('POST/verify/200', async () => {

    const captchaService = {
        verify: jest.fn().mockReturnValue(true)
    }

    const server = new ServerService(serverPort, false);

    await server.registerRoutes(getRoutes(captchaService as any));

    const response = await server.inject().post('/verify').body({
        captchaId: '8360d235-cc52-494f-ba86-a8de2b424eab',
        userInput: 'dZxF'
    });

    expect(response.statusCode).toBe(200);
});

test('POST/verify/400', async () => {

    const captchaService = {
        verify: jest.fn().mockReturnValue(false)
    }

    const server = new ServerService(serverPort, false);

    await server.registerRoutes(getRoutes(captchaService as any));

    const response = await server.inject().post('/verify').body({
        captchaId: '8360d235-cc52-494f-ba86-a8de2b424eab',
        userInput: 'dZxF'
    });

    expect(response.statusCode).toBe(400);
});