FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app
RUN npm install -g turbo

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY turbo.json ./

RUN yarn install
RUN yarn build

# Bundle app source
COPY . .

EXPOSE 4000
CMD ["yarn", "start"]
