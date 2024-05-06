# BattleScribe - A Better Tabletop Combat Tracker

## Development setup

This project sources D&D 5e's Basic rules by way of the 5th edition SRD Database. The DB can be found here: https://github.com/5e-bits/5e-database

In order to develop locally, this db must be built and running on the local machine, or on an acessible server. Run the following to download, instantiate and populate the db for local development:

1. Install mongodb community edition (if not already installed): https://www.mongodb.com/docs/manual/installation/
2. setup local path and instiatiate db (Linux):

`mkdir ~/data/db && sudo mongod --dbpath=~/data/db`

3. Clone 5e SRD db repository and run script to populate database:

` git clone https://github.com/5e-bits/5e-database  && cd 5e-database && npm install`
` MONGODB_URI=mongodb://localhost/5e-database npm run db:refresh`

4. Create .env file in BattleScribe root folder and add MongodDB url string:
   `cd battlescribe/ && echo "DB_STRING='mongodb://localhost/5e-database" > .env`

5. Install npm dependencies and run in dev mode
   `npm install && npm run dev`

and that's it! Before running locally each time, ensure mongod is running and pointed to the corred db path
