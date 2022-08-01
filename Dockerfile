From node:16
WORKDIR /usr/app
COPY package*.json ./

ARG PORT
ARG NODE_ENV

ENV PORT $PORT
ENV NODE_ENV $NODE_ENV

RUN npm ci

# Bundle app source
COPY dist .

EXPOSE $PORT

CMD [ "node", "index.js" ]