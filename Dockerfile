FROM node:16.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]