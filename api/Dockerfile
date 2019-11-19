FROM node:10

# Work directory
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY . /app

RUN yarn
COPY .env /app
RUN yarn build

EXPOSE 8008

# Run app
CMD [ "yarn", "start" ]
