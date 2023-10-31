FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install axios
RUN npm install cors
RUN npm install mongoose

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
