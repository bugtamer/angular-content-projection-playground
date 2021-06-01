# STAGE 1
FROM node:14.4.0-alpine AS BUILDING_STAGE
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install @angular/cli@11.0.0
RUN npm run build --prod

# STAGE 2
FROM nginx:alpine
COPY --from=BUILDING_STAGE /app/dist/angular-content-projection-playground /usr/share/nginx/html
EXPOSE 80
