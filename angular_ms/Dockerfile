FROM node:18 as build

RUN mkdir -p /home/angular_ms/front

WORKDIR /home/angular_ms/front

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/angular_ms/front/dist/* /usr/share/nginx/html

EXPOSE 80