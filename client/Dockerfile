FROM node:14-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN chmod +x dependency_fix.sh && ./dependency_fix.sh
CMD [ "npm", "run", "start"]