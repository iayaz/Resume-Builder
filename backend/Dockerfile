FROM node:14-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g typescript nodemon

COPY . . 

EXPOSE 3000

CMD ["npm" , "start"]