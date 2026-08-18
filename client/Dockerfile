FROM node:16.20.2-buster-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN mv .env.example .env
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/cache/nginx /var/run && \
    chgrp -R 0 /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html && \
    chmod -R g=u /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html

USER 1001

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]