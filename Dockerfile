FROM node:18
# Create app directory
WORKDIR /app
# Install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]