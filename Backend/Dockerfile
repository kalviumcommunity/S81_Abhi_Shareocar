# Backend Dockerfile
FROM node:22-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src

# Expose API port
EXPOSE 5000

# Run server
CMD ["node", "src/index.js"]
