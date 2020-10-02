FROM node:stretch-slim
RUN npm -g install sails
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]