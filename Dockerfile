#BUILD DEL PROYECTO
FROM node:21-alpine3.18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#PASO 2 CREAR SERVIDOR DE NGINX
FROM nginx:1.25.4-alpine AS prod-stage
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]
