FROM node:18-slim

ENV NODE_ENV development

COPY ../shared-context ./
RUN cd shared-context && npn i && cd ..

WORKDIR /app

COPY package*.json  ./

RUN npm i \
    && npm i -g jest \
    && npx playwright install --with-deps chromium

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 8083