# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências para dentro do container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Compila o projeto NestJS
#RUN npm run build

# Expõe a porta que o NestJS utiliza
EXPOSE 3000

# Comando para iniciar o aplicativo (produção)
#ENTRYPOINT npm run start:dev