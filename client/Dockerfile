
# Stage 1: Build React frontend
FROM node:16.20.2-buster-slim AS build

WORKDIR /usr/src/app

# Install dependencies using the lockfile
COPY package*.json ./
RUN npm ci \
    --maxsockets=1 \
    --fetch-retries=5 \
    --fetch-timeout=600000 \
    --fetch-retry-mintimeout=20000 \
    --fetch-retry-maxtimeout=120000

# Copy application source
COPY . .

# Frontend API URL is embedded during the build
ARG API_URL=/api
ENV API_URL=${API_URL}

# Build production frontend
RUN npm run build


# Stage 2: Serve frontend using Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
