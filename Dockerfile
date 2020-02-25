From node:10

# Work directory
WORKDIR /app

COPY ui/package.json /app
COPY ui/yarn.lock /app
COPY ui/tsconfig.json /app
COPY ui/src/ /app/src
COPY ui/public/ /app/public

RUN yarn
COPY ui/.env /app

# Work directory
WORKDIR /api

COPY api/package.json /api
COPY api/yarn.lock /api
COPY api/. /api

RUN yarn
COPY api/.env /api
RUN yarn build

EXPOSE 8080
EXPOSE 8081

WORKDIR /
COPY start.bash /
# Run app
CMD [ "./start.bash"]
