# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Pasa la URL del backend al momento de build (prefijo VITE_ es obligatorio)
ARG VITE_API_BASE=http://localhost:5000
ENV VITE_API_BASE=${VITE_API_BASE}

# Vite lee import.meta.env en build
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine
# Nginx para SPA con fallback a index.html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# Opcional: healthcheck simple
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1
