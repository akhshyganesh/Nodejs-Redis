FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# Start the worker process (e.g., app.js)
CMD ["node", "app.js"]
