# Captcha api service
This API service is used to generate and verify captchas 

# How to run
1. execute "docker compose up" to start the container.
2. go to http://localhost:3000/docs to see the API docs made with swagger ui.

# How to test with jest.js

1. After cloning the source code in your local pc, run "npm ci" for install all dependencies in the root folder of the project.
2. execute "docker compose -f docker-compose.dev.yml up" and then run "npm run test"


# Tecnologies used:
- [Typescript](https://www.typescriptlang.org/)
- [NodeJs](https://nodejs.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Fastify](https://fastify.dev/)