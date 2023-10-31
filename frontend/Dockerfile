FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install axios
RUN npm install cors
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]

