FROM node:18.14.1 AS build

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]