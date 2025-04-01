Open port 3306

Installing MySQL
```
sudo apt update 
sudo apt install mysql-server -y
```

# Edit MySQL configuration
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

# Change the bind-address from 127.0.0.1 to 0.0.0.0
# Find this line:
# bind-address = 127.0.0.1
# Change to:
# bind-address = 0.0.0.0
# Restart MySQL
sudo systemctl restart mysql

`sudo mysql`

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Proj2Pwd';`

`mysql> exit`

`sudo mysql_secure_installation`

`sudo mysql -p` Proj2Pwd

```
mysql>
CREATE DATABASE christaboss_db;
CREATE USER 'admin_user'@'%' IDENTIFIED WITH mysql_native_password BY 'PassWord.1';
GRANT ALL ON christaboss_db.* TO 'admin_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```

`mysql -u admin_user -p`

```
SHOW DATABASES;
CREATE TABLE contact_form (item_id INT AUTO_INCREMENT,content VARCHAR(255),PRIMARY KEY(item_id));
SELECT * FROM contact_form;
```


BACKEND
`sudo apt update -y && sudo apt upgrade -y && sudo apt install git npm curl -y`

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
``

`git clone https://github.com/theGameChangerDev/ChristabossGlobalResourceBackend`

`cd ChristabossGlobalResourceBackend`
`touch .env`
`npm install`
`npm install mysql2`

`npm start`
