FROM node:alpine

WORKDIR /usr/src/app

# Separate docker layer for npm install (faster cached install)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
