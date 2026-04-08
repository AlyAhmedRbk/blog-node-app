# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Create data directory if not exists
RUN mkdir -p data && touch data/tasks.json

# Expose app port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]