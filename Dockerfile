FROM node:lts-alpine as builder
WORKDIR /usr/src/build
ADD package.json /usr/src/build
ADD yarn.lock /usr/src/build
RUN yarn
COPY . /usr/src/build
WORKDIR /usr/src/build
RUN NODE_OPTIONS=--openssl-legacy-provider yarn run build:prod

FROM nginx:alpine

ENV VUE_APP_BASE_API=/api \
    VUE_APP_FILE_PREFIX=/uploads

COPY --from=builder /usr/src/build/dist /opt/app
COPY --from=builder /usr/src/build/app.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]