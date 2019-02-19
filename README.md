# Marvel characters
Mini web page for viewing marvel characters


# Change config value before running or deploying the app
Change the config values like `marvel api key` and `marvel api secret` in :
* `web/src/config/config-{env}.js`
* `back/src/config/config-{env}.js`


# Run app locally in terminal

### 1. Open a terminal, go to the `back` folder and run:
`npm install`
`npm start`

### 2. Open another terminal, go to the `web` folder and run:
`npm install`
`npm start`

### 3. Go go the broser and type `http://localhost:3000`



# Deploy in AWS (use a profile with enough access : ECS, ECR, S3, EC2)
The idea is to use serverless framework to simply deploy two fargates tasks (web + back) without manangin any EC2 instances.

It will create :
* an ECR repo `marvel-characters` (to put docker images of this app)
* a S3 buckets for serverless deployment,
* cloudformation stack (created via serverless) containing resources: Security group, ECS clusters, services and fargate tasks.

NOTE: We can add Application load balancers to the two fargates services in ECS so that we can attach a domain for service discovery (Because even we have only 1 task for service back and service front, the public Ip of the task will change each time we restart the task or redeploy the service). But the ALB is very expensive, so I simply fetch the public IP for this test

### 1. go to the `back` folder and
* build publish the docker image (will create the repo in this step):
`PROFILE=[your aws profile] STAGE=[your stage] REGION=[your was region] make publish`
* run serverless deploy (the marvel api key and secret you can configure in the config file instead of putting in here):
```
serverless deploy \
  --stage [stage] \
  --aws-profile [aws profile] \
  --region [region] \
  --vpc [your aws vpc id] \
  --vpc-subnet [your aws subnet in the VPC] \
  --back-docker-image [the docker image URI you just pushed] \
  --marvel-api-key [your marvel API key] \
  --marvel-api-secret [your marvel API secret]
```

### 2. wait the serverless deploy finished and fetch the public ip of the back end fargate task:
`aws ec2 describe-network-interfaces --network-interface-ids $(aws ecs describe-tasks --cluster marvel-characters-back-dev --task $(aws ecs list-tasks --cluster marvel-characters-back-dev | jq -r ".taskArns[0]") | jq -r ".tasks[0].attachments[0].details[1].value") | jq -r ".NetworkInterfaces[0].Association.PublicIp"`

It displays the ip, and copy that ip to use it in the next step

### 3. go to the `web` folder and
* build publish the docker image (will create the repo in this step):
`PROFILE=[your aws profile] REGION=[your was region] make publish`
* run serverless deploy (use the public Ip fetched in step 2):
```
serverless deploy \
    --stage [stage] \
    --aws-profile [your aws account] \
    --region [your aws region] \
    --[your aws VPC id] \
    --vpc-subnet [your subnet id in the VPC] \
    --web-docker-image [web docker image URI] \
    --backend-public-ip [public ip]
```


### 4. wait the serverless deploy finished and fetch the public ip of the web app fargate task:
`aws ec2 describe-network-interfaces --network-interface-ids $(aws ecs describe-tasks --cluster marvel-characters-web-dev --task $(aws ecs list-tasks --cluster marvel-characters-web-dev | jq -r ".taskArns[0]") | jq -r ".tasks[0].attachments[0].details[1].value") | jq -r ".NetworkInterfaces[0].Association.PublicIp"`

and go to your broser and type `http://[public ip]:3000`



# How to remove the stacks in AWS in the console:
* go to S3 console and remove the content of the buckets (for serverless deploy) with name like `marvel-characters`
* go to Cloudformation console and remove the two stacks with name like `marvel-characters`
* go to ECR and remove the repo with name `marvel-characters`



# Issues and TODO
  * We can add Application load balancers to the two fargates services in ECS so that we can attach a domain for service discovery (Because even we have only 1 task for service back and service front, the public Ip of the task will change each time we restart the task or redeploy the service)
