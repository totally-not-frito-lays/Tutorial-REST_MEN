# Tutorial-REST_MEN

Following a tutorial from WebDevSimplified on creating a MEN (MongoDB, Express, Node) REST API.

https://youtu.be/fgTGADljAeg?si=gJA8cev1FO4mJCPF

## Install

```sh
npm init
npm i express mongoose dotenv nodemon
npm run devStart
```

## Using WSL

> [!Tip]
> I ended up following the instructions for everything down below. Not sure how
> to stop the services or how `service` is differnt from `systemctl`.

- [Mongo Linux Install](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- [WSL Mongo Install](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb)
- [WSL Mongo Troubleshooting](https://stackoverflow.com/questions/62495999/installing-mongodb-in-wsl)

```sh
# start Mongod
sudo systemctl start mongod
# check Mongod status
sudo systemctl status mongod
# stop Mongod
sudo systemctl stop mongod
```

OR 

```sh
sudo service mongod start
```