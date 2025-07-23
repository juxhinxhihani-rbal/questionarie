FROM artifacts.rbi.tech/docker-io-docker-proxy/node:22-bullseye-slim AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm cache clean --force && rm -rf node_modules && npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build

FROM docker.artifacts.rbi.tech/nginx:stable
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]