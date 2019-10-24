From node:10

# Work directory
WORKDIR /app

COPY package.json /app
COPY public/  /app/public
COPY src/ /app/src
COPY tsconfig.json /app
COPY yarn.lock /app

RUN yarn install

COPY .env.local /app

EXPOSE 8008

# Run app
CMD [ "yarn", "start" ]