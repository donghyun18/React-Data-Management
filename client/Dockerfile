# -------- Build stage --------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build your production assets
# Vite and CRA both use "npm run build"
RUN npm run build

# -------- Serve stage --------
FROM nginx:alpine
# client/Dockerfile
COPY --from=build /app/build /usr/share/nginx/html

# If you use CRA, comment the previous line and use the next one:
# COPY --from=build /app/build /usr/share/nginx/html

# SPA routing + (optional) asset caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
