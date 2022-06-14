FROM node:14.19
WORKDIR /app
COPY . .
RUN yarn global add tsc typescript
RUN yarn install
RUN yarn build
WORKDIR /app/dist
CMD [ "node", "index.js" ]
