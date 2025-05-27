
FROM node:18-alpine

WORKDIR /app

# Configurar yarn para ser mais resiliente a timeouts
RUN yarn config set network-timeout 300000
RUN yarn config set registry https://registry.yarnpkg.com

# Copy package files
COPY package.json ./

# Install dependencies com retry
RUN yarn install --production --network-timeout 300000 || yarn install --production --network-timeout 300000 || yarn install --production --network-timeout 300000

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 3001

# Start the application
CMD ["yarn", "start"]
