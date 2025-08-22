# Build stage
FROM node:22-slim AS builder
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

# Production stage
FROM node:22-slim AS productionf
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app/build ./build

# Install a lightweight static file server
RUN npm install -g serve

ENV PORT=3000

EXPOSE $PORT
CMD ["serve", "-s", "build"]
