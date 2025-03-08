# Install MySQL
sudo apt update
sudo apt install mysql-server -y

# Secure MySQL installation
sudo mysql_secure_installation

# Login to MySQL
sudo mysql

# Create database and user
CREATE DATABASE christaboss_db;
CREATE USER 'your_mysql_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
GRANT ALL PRIVILEGES ON christaboss_db.* TO 'your_mysql_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;


# Edit MySQL configuration
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Change the bind-address from 127.0.0.1 to 0.0.0.0
# Find this line:
# bind-address = 127.0.0.1
# Change to:
# bind-address = 0.0.0.0

# Save and exit

# Restart MySQL
sudo systemctl restart mysql


`sudo apt update -y && sudo apt upgrade -y && sudo apt install git npm curl -y`

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
``

`git clone https://github.com/theGameChangerDev/ChristabossGlobalResourceFrontend`

`cd ChristabossGlobalResourceFrontend`

`npm install`
`npm install mysql2`
`npm start`

`npm run build`

```
sudo npm install -g serve
serve -s build
```