FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY .sequelizerc ./
COPY tsconfig.json ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]