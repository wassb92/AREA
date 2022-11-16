FROM node:16.17.0

WORKDIR /usr/src/app

COPY . .

RUN npm install -f

RUN npm install -g nodemon

EXPOSE 8080

CMD [ "npm", "start" ]
