# nodejs-base
This project uses Sequelize v5 as ORM 

## Requirements
 - node: 8.15 and above
 - mysql: 5.7

## How to run
``` bash
# Install dependencies
$ npm install

# Start server only
$ npm run boot

# Automatically init database and run
$ npm start
```

## Useful commands

``` bash
# Create database
$ npm run db:create

# Migrate database
$ npm run db:migrate

# Drop database
$ npm run db:drop
```