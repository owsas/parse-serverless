FROM node:8

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 1337

CMD [ "npm", "start" ]
