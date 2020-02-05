FROM node:12.13.0
WORKDIR /usr/src/app
COPY . . 
COPY production.env .env 

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build 

EXPOSE 3001
CMD ["npm","run","start:prod"]