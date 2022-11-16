FROM node:16.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -f

RUN npm install -g nodemon

COPY . .

EXPOSE 8081

CMD ["npm", "start"]
