# Deploying a Node.js Blog Application on AWS EC2 with RDS MySQL (Step-by-Step Guide)
A complete hands-on guide to building, deploying, and connecting a Node.js application with a managed MySQL database on AWS.
Introduction
In this guide, I will walk through deploying a full-stack blog application built with Node.js, including a simple user interface for creating and managing blog posts. The application is hosted on Amazon Web Services EC2 and connected to a managed MySQL database using Amazon RDS.
This setup reflects a real-world architecture where the application and database are separated for better scalability and maintainability.
By the end of this tutorial, you will have:
A running Node.js blog application with a user interface on EC2
A MySQL database hosted on RDS
Successful integration between the application and database

# Architecture Overview
The application follows this architecture:
User → EC2 (Node.js App with UI) → RDS (MySQL Database)

## Step 1: Create MySQL Database on RDS
Navigate to the AWS console and open the RDS service.
Click “Create database”
Select MySQL as the engine
Choose Free Tier template
Configure:
DB instance name: blog-db
Username: admin
Password: yourpassword


## Configure Security Group
Add an inbound rule:
Type: MySQL
Port: 3306
Source: your EC2 security group (or 0.0.0.0/0 for testing)


Copy Endpoint
After the database is created, copy the endpoint URL. This will be used to connect your application.


## Step 2: Launch EC2 Instance
Go to EC2 and launch a new instance.
Configuration:
OS: Ubuntu 22.04
Instance type: t2.micro


Configure Security Group
Allow the following inbound rules:
SSH (22)
HTTP (80)
Custom TCP (5000)


Connect to EC2
Use SSH to connect:
ssh -i your-key.pem ubuntu@your-ec2-ip

## Step 3: Setup Node.js Environment
Install required packages:
```bash
sudo apt update
sudo apt install nodejs npm git -y
#Verify installation:
node -v
npm -v
```
### Clone the Application
```bash
git clone https://github.com/your-repo/blog-app.git
cd blog-app
npm install
```
## Step 4: Connect Application to RDS
Update your environment variables:
```bash
DB_HOST=your-rds-endpoint
DB_USER=admin
DB_PASSWORD=yourpassword
DB_NAME=blogdb
DB_PORT=3306
```
This configuration allows your application to communicate with the database securely and can be reused when scaling or migrating environments.

## Step 5: Connect to RDS from EC2
Install MySQL client:
```bash
 sudo apt install mysql-client -y
```
Connect to your database:
```bash
 mysql -h your-endpoint -u admin -p
```
This step ensures that your EC2 instance can successfully communicate with the RDS database.

## Step 6: Run the Application
Start the server:
```bash
node server.js
```
Access the application in your browser:
http://100.27.204.235:5000/

Conclusion
This project demonstrates how to deploy a full-stack Node.js application with a user interface on Amazon Web Services using EC2 and connect it to a managed database via Amazon RDS.
By separating the application and database layers, this architecture aligns with modern cloud best practices and provides a scalable foundation for future enhancements.

