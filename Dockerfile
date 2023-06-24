FROM node:18
WORKDIR /lib
ADD package.json package-lock.json /lib/

COPY . .
RUN npm install
RUN npm rebuild --verbose sharp

EXPOSE 8080