FROM node:22-slim
WORKDIR /app

COPY . .

RUN yarn
