FROM node:14.17-alpine

WORKDIR /app

COPY ["package.json", "yarn.json", "./"]

RUN yarn install --production

COPY . .

RUN yarn build

ENV NODE_ENV=production

CMD [ "entrypoint.sh" ]