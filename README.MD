# SYSTEM SETUP #

## Pre-Requisites ##
node version 12.18.2
npm version 6.14.5
mysql version ??


```
#!shell

nvm use 12.18.2
npm install -g mysql
npm install -g sequelize-auto

```

# CODE SETUP #
## Get the repository ##
```
#!shell
mkdir PrismJohnson
cd PrismJohnson
git clone <THIS_PROJECT_GIT_URL>

```

## Install packages ##

```
#!shell

npm install
npm i npm@4 -g

```

# RUN #
## Start server on command line ##

```
#!shell

PORT=8111 NODE_ENV=development DEBUG=digiapt-prism-johnson-backend:* npm start

```

## Start server on command line as a background process ##

```
#!shell

PORT=8111 NODE_ENV=development DEBUG=digiapt-prism-johnson-backend:* forever start bin/www 

```