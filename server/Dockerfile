FROM node:22.1.0-alpine3.19

WORKDIR /app/server

COPY package.json .

RUN npm install

COPY . .

ENV PORT=4000

CMD ["node", "--watch", "src/index.mjs"]