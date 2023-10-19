FROM --platform=amd64 node:18 as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM --platform=amd64 node:18 as prod
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD [ "npm", "run", "start" ]
EXPOSE 3000