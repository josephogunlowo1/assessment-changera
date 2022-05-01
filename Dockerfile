FROM node:14

WORKDIR /jojo

COPY package.json .

RUN npm install

COPY . .

RUN tsc

EXPOSE 3002

CMD [ "npm", "start" ]