FROM node:20-alpine

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Ensure data directory exists
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "src/server.js"]
