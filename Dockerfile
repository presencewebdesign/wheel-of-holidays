# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install a simple HTTP server
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (Cloud Run will set the PORT env variable)
ENV PORT=8080
EXPOSE 8080

# Start the server on 0.0.0.0 to accept connections from Cloud Run
CMD serve -s dist -l tcp://0.0.0.0:$PORT

