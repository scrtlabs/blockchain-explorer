From node:10

# Work directory
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY tsconfig.json /app
COPY src/ /app/src
COPY public/ /app/public

RUN yarn
COPY .env /app

EXPOSE 3000

# Run app
CMD [ "yarn", "start" ]
