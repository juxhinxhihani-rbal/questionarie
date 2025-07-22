FROM artifacts.rbi.tech/docker-io-docker-proxy/node:18-bullseye-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build

FROM docker.artifacts.rbi.tech/nginx:mainline

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.next/static /var/www/investment-platform/_next/static
COPY --from=build /app/out /var/www/investment-platform
COPY --from=build /app/public /var/www/investment-platform

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]