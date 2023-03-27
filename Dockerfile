# FROM node:alpine

FROM 132927147679.dkr.ecr.us-east-1.amazonaws.com/alpine-node:latest

WORKDIR /gamodo-ui
COPY API/ ./API/
COPY Axios/ ./Axios/
COPY pages/ ./pages/
COPY CONFIG/ ./CONFIG/
COPY Components/ ./Components/
COPY Hooks/ ./Hooks/
COPY JSON/ ./JSON/
COPY LAYOUT/ ./LAYOUT/
COPY ReduxToolkit/ ./ReduxToolkit/
COPY contexts/ ./contexts/
COPY docs/ ./docs/
COPY lib/ ./lib/
COPY public/ ./public/
COPY styles/ ./styles/
COPY themes/ ./themes/
COPY ui/ ./ui/
COPY package.json ./

COPY . .
RUN mv ./.env.sample ./.env

# RUN npm cache clean --force
# RUN npm install -g node-gyp
# RUN npm install -g  babel-loader @babel/cli 
RUN npm install --force
RUN npm run build

ENV PORT 14015

EXPOSE 14015

CMD ["npm", "start"]
