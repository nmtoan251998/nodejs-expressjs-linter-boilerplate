# Backend APIs Nodejs App boilerplate

## Features
- *Eslint* for linter
- *Docker* for containerlization
- *MongoDb* for database
- *apidoc* for APIs documenting

## Requisites
- OS: Linux (prefered), Windows, MacOS
- Docker
- NodeJs: v12.13.1 (prefered using nvm)

## Usage
Clone my repo
```
git clone https://github.com/nmtoan251998/nodejs-expressjs-linter-boilerplate.git
```

Install necessary modules
```
cd nodejs-expressjs-linter-boilerplate

npm i
```
## Available scripts
Linter
```
npm run linter:watch
```

Start server development in your local machine
```
npm start
```

Start server development in docker container
```
npm run start-docker
```
**Warning:** Remember to turn off all services running on used ports.
1. App server is *5000*
2. MongoDb server is *27017*

Generate APIs documentation
```
npm run apidoc
```