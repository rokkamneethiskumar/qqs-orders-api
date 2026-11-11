
# Stage 1: Build and validate the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint && npm test


# Stage 2: Create a lightweight production image
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/src ./src

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]
