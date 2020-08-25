# SYSTEM SETUP #

## Pre-Requisites ##
node version 12.18.2
npm version 6.14.5
mysql version 5.7


```
#!shell

nvm use 12.18.2
npm install -g mysql2
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

# DB SETUP #
## Login to mysql ##

```
#!shell

mysql -h host -u <user> -p
or
mysql -u <user> -p

DROP DATABASE prism_johnson;

CREATE DATABASE prism_johnson;

CREATE USER 'prism_johnson'@'localhost' IDENTIFIED BY 'pri5wj0hns0N';

GRANT ALL ON prism_johnson.* TO 'prism_johnson'@'localhost';

## If you would like to re-generate the models from the DB, run the below ##

```
#!shell

sequelize-auto -o "./models" -d prism_johnson -h localhost -u prism_johnson -p 3306 -x <password> -e mysql

```