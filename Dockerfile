# Use the official Node.js image as base
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js application is running on
EXPOSE 3000

# Start the worker process (e.g., worker.js)
CMD ["node", "app.js"]
