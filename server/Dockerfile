# Stage 1: Backend application
FROM node:16.20.2-buster-slim

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install exact dependencies from package-lock.json
RUN npm ci \
    --maxsockets=1 \
    --fetch-retries=5 \
    --fetch-timeout=600000 \
    --fetch-retry-mintimeout=20000 \
    --fetch-retry-maxtimeout=120000

# Copy application source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]