Open port 3306

Installing MySQL
```
sudo apt install mysql-server
```

`sudo mysql`

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Proj2Pwd';`

`mysql> exit`

`sudo mysql_secure_installation`

PassWord.1

`sudo mysql -p` PassWord.1

`CREATE DATABASE christaboss_db;`

```
mysql> 
CREATE USER 'admin_user'@'%' IDENTIFIED WITH mysql_native_password BY 'PassWord.1';
GRANT ALL ON christaboss_db.* TO 'admin_user'@'%';
```

`mysql -u admin_user -p`

```
SHOW DATABASES;
CREATE TABLE contact_form (item_id INT AUTO_INCREMENT,content VARCHAR(255),PRIMARY KEY(item_id));
SELECT * FROM contact_form;
```