FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY app.js model.js registry.js index.js ./
USER node
EXPOSE 3000
CMD ["node", "index.js"]
