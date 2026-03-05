# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder

# Example:
# --build-arg REPO_ARCHIVE_URL=https://codeload.github.com/OWNER/REPO/tar.gz/refs/heads/main
ARG REPO_ARCHIVE_URL

WORKDIR /src

RUN apk add --no-cache wget tar
RUN test -n "$REPO_ARCHIVE_URL"

# Download the repository source archive directly from GitHub.
RUN wget -O /tmp/repo.tar.gz "$REPO_ARCHIVE_URL" \
  && mkdir -p /tmp/repo \
  && tar -xzf /tmp/repo.tar.gz -C /tmp/repo --strip-components=1 \
  && cp -R /tmp/repo/. /src \
  && rm -rf /tmp/repo /tmp/repo.tar.gz

RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets/ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
  }
}
EOF

COPY --from=builder /src/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
