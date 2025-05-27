
# Dockerfile para o Idea Tracker React App

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Configurar yarn para ser mais resiliente a timeouts
RUN yarn config set network-timeout 300000
RUN yarn config set registry https://registry.yarnpkg.com

# Copiar package files
COPY package.json ./

# Instalar dependências com retry
RUN yarn install --network-timeout 300000 || yarn install --network-timeout 300000 || yarn install --network-timeout 300000

# Copiar código fonte
COPY . .

# Build da aplicação
RUN yarn build

# Stage 2: Production
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
