FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM build AS run
EXPOSE 4200
ENTRYPOINT [ "npm", "start" ]