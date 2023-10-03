FROM node as base

WORKDIR /app
COPY package.json .
EXPOSE $PORT

FROM base as development

RUN npm install 
COPY . .
CMD ["npx", "nodemon", "--legacy-watch", "index.js"]

FROM base as production

RUN npm install --only=production
COPY . .
CMD ["node", "run", "starft"]
