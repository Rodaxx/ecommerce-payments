FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN rm -f .env
RUN rm -f -R ./node_modules

RUN npm install

CMD [ "npm", "run", "start" ]