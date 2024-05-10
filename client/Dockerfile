FROM node:22.1.0-alpine3.19

WORKDIR /app/client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]