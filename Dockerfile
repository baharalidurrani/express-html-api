FROM node:10.23-alpine

WORKDIR /usr/src/app

COPY . .
RUN ls -a

RUN npm install -g typescript

RUN npm ci
RUN npm run build
RUN ls -a

EXPOSE 3000

CMD [ "node", "dist/server.js" ]