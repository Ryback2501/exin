# syntax=docker/dockerfile:1

# Build the static bundle, then serve it with nginx.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build at the site root (VITE_BASE=/) so the container serves Exin at "/".
# GitHub Pages instead uses the default base /exin/ via a plain `npm run build`.
RUN VITE_BASE=/ npm run build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
# Serve the SPA at the root, listening on IPv4 and IPv6 (so `localhost`, which
# may resolve to ::1 first, reaches nginx). SPA fallback to index.html, plus a
# 30-day immutable cache for the fingerprinted /assets/ bundle.
RUN printf 'server {\n  listen 80;\n  listen [::]:80;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / { try_files $uri $uri/ /index.html; }\n  location /assets/ {\n    expires 30d;\n    add_header Cache-Control "public, max-age=2592000, immutable";\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
