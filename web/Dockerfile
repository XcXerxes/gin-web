FROM node:alpine as build
WORKDIR /Users/zhangjie/xinbo/myself/react/gin-web
COPY ./ .

RUN yarn install --silent && yarn build


FROM nginx
EXPOSE 80
COPY --from=build /Users/zhangjie/xinbo/myself/react/gin-web/build /usr/local/var/www
