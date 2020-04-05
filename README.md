# Micro Services App

[![Build Status](https://travis-ci.com/nomanaadma/Micro-Services-App.svg?branch=master)](https://travis-ci.com/nomanaadma/Micro-Services-App)


<span style="color:#cc0000">The top way over complicated version of a Micro Service App just to get experience with a multi container deployment with production and development  grade environment.</span>

> Combination of React, Express, Redis, Postgres and Node. Multi container app setup with docker and travis CI/CD pipeline. Using images on docker hub to deploy app directly into AWS Elasticbeanstalk

## Prerequisites

```
1.Make sure you have docker and docker compose installed in system
```

## Tech Stacks
* [Docker](https://www.docker.com) - Containerize app
* [Docker Compose](https://docs.docker.com/compose) - Local development environment to run tests and builds by using volumes and networks
* [Docker Hub](https://hub.docker.com/) - Convenient Images
* [NGINX](https://www.nginx.com/) - Web Server
* [Create React App](https://github.com/facebook/create-react-app) - Bootstrapping
* [Node](https://hub.docker.com/_/node) - Backend
* [Redis](https://redis.io/) - Memcached
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Travis-ci](https://travis-ci.com/) - CI/CD Pipelines
* [Amazon S3](https://aws.amazon.com/s3/) - Storage on Production
* [Amazon RDS](https://aws.amazon.com/rds/) - Database on Production
* [Amazon ElastiCache](https://aws.amazon.com/elasticache/) - Memcached on Production
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) - Host And Manage App

### Application Architecture

Created using [App Diagram](https://app.diagrams.net/)
<div align="center">  
  <img alt="Application Architechture" src="screenshots/Application Architechture.png"/>
</div>

### Development Architecture

Run following command in your terminal

```bash
docker compose up --build
```

remove --build argument if you are rerunning the app witout making any change in dockerfile and docker-compose.yml file

and you are good to go visit http://localhost:3050

Created using [App Diagram](https://app.diagrams.net/)
<div align="center">  
  <img alt="Development Architecture" src="screenshots/Development Architecture.png"/>
</div>

### Deployment Architecture
Created using [App Diagram](https://app.diagrams.net/)
<div align="center">  
  <img alt="Deployment Architecture" src="screenshots/Deployment Architecture.png"/>
</div>

#### Steps
###### RDS Database Creation
<ol><li><p>Go to AWS Management Console and use Find Services to search for RDS</p></li><li><p>Click Create database button</p></li><li><p>Select PostgreSQL</p></li><li><p>Check 'only enable options eligible for RDS Free Usage Tier' and click Next button</p></li><li><p>Scroll down to Settings Form</p></li><li><p>Set DB Instance identifier to multi-docker-postgres</p></li><li><p>Set Master Username to postgres</p></li><li><p>Set Master Password to postgres and confirm</p></li><li><p>Click Next button</p></li><li><p>Make sure VPC is set to Default VPC</p></li><li><p>Scroll down to Database Options</p></li><li><p>Set Database Name of your choice<p></li><li><p>Scroll down and click Create Database button</p></li></ol>

###### ElastiCache Redis Creation
<ol><li><p>Go to AWS Management Console and use Find Services to search for ElastiCache</p></li><li><p>Click Redis in sidebar</p></li><li><p>Click the Create button</p></li><li><p>Make sure Redis is set as Cluster Engine</p></li><li><p>In Redis Settings form, set Name to multi-*****</p></li><li><p>Change Node type to 'cache.t2.micro'</p></li><li><p>Change Number of replicas to 0</p></li><li><p>Scroll down to Advanced Redis Settings</p></li><li><p>Subnet Group should say “Create New"</p></li><li><p>Set Name to redis-group</p></li><li><p>VPC should be set to default VPC</p></li><li><p>Tick all subnet’s boxes</p></li><li><p>Scroll down and click Create button</p></li></ol>

###### Creating a Custom Security Group
<ol><li><p>Go to AWS Management Console and use Find Services to search for VPC</p></li><li><p>Click Security Groups in sidebar</p></li><li><p>Click Create Security Group button</p></li><li><p>Set Security group name to multi-docker</p></li><li><p>Set Description to multi-docker</p></li><li><p>Set VPC to default VPC</p></li><li><p>Click Create Button</p></li><li><p>Click Close</p></li><li><p>Manually tick the empty field in the Name column of the new security group and type multi-docker, then click the checkmark icon.</p></li><li><p>Scroll down and click Inbound Rules</p></li><li><p>Click Edit Rules button</p></li><li><p>Click Add Rule</p></li><li><p>Set Port Range to 5432-6379</p></li><li><p>Click in box next to Custom and start typing 'sg' into the box. Select the Security Group you just created, it should look similar to 'sg-…. | multi-docker’</p></li><li><p>Click Save Rules button</p></li><li><p>Click Close</p></li></ol>

###### Applying Security Groups to ElastiCache
<ol><li><p>Go to AWS Management Console and use Find Services to search for ElastiCache</p></li><li><p>Click Redis in Sidebar</p></li><li><p>Check box next to Redis cluster and click Modify</p></li><li><p>Change VPC Security group to the multi-docker group and click Save</p></li><li><p>Click Modify</p></li></ol>

###### Applying Security Groups to RDS
<ol><li><p>Go to AWS Management Console and use Find Services to search for RDS</p></li><li><p>Click Databases in Sidebar and check box next to your instance</p></li><li><p>Click Modify button</p></li><li><p>Scroll down to Network and Security change Security group to multi-docker</p></li><li><p>Scroll down and click Continue button</p></li><li><p>Click Modify DB instance button</p></li></ol>

###### Applying Security Groups to Elastic Beanstalk
<ol><li><p>Go to AWS Management Console and use Find Services to search for Elastic Beanstalk</p></li><li><p>Click the multi-docker application tile</p></li><li><p>Click Configuration link in Sidebar</p></li><li><p>Click Modify in Instances card</p></li><li><p>Scroll down to EC2 Security Groups and tick box next to multi-docker</p></li><li><p>Click Apply and Click Confirm</p></li></ol>

###### Setting Environment Variables
<ol><li><p>Go to AWS Management Console and use Find Services to search for Elastic Beanstalk</p></li><li><p>Click the multi-docker application tile</p></li><li><p>Click Configuration link in Sidebar</p></li><li><p>Select Modify in the Software tile</p></li><li><p>Scroll down to Environment properties</p></li><li><p>In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379</p></li><li><p>Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379</p></li><li><p>Set REDIS_PORT to 6379</p></li><li><p>Set PGUSER to postgres</p></li><li><p>Set PGPASSWORD to *********</p></li><li><p>In another tab, open up RDS dashboard, click databases in sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.</p></li><li><p>Set the PGHOST key to the endpoint value listed above.</p></li><li><p>Set PGDATABASE to fibvalues</p></li><li><p>Set PGPORT to 5432</p></li><li><p>Click Apply button</p></li></ol>

###### IAM Keys for Deployment
<ol><li><p>Go to AWS Management Console and use Find Services to search for IAM</p></li><li><p>Click Users link in the Sidebar</p></li><li><p>Click Add User button</p></li><li><p>Set User name to multi-docker-deployer</p></li><li><p>Set Access-type to Programmatic Access</p></li><li><p>Click Next:Permissions button</p></li><li><p>Select Attach existing polices directly button</p></li><li><p>Search for 'beanstalk' and check all boxes</p></li><li><p>Click Next:Review</p></li><li><p>Add tag if you want and Click Next:Review</p></li><li><p>Click Create User</p></li><li><p>Copy Access key ID and secret access key for use later</p></li></ol>

###### Keys in Travis
<ol><li><p>Open up Travis dashboard and find your multi-docker app</p></li><li><p>Click More Options, and select Settings</p></li><li><p>Scroll to Environment Variables</p></li><li><p>Add AWS_ACCESS_KEY and set to your AWS access key</p></li><li><p>Add AWS_SECRET_KEY and set to your AWS secret key</p></li><li><p>Add DOCKER_ID and set to your docker id secret key</p></li><li><p>Add DOCKER_PASSWORD and set to your docker password</p></li></ol>

## Screenshots
See the screenshots folder for detailed instructions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.