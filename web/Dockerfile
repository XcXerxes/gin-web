FROM node:alpine as build
WORKDIR /Users/zhangjie/xinbo/myself/react/gin-web/build
COPY ./ .

RUN yarn install --silent && yarn build

EXPOSE 3000
