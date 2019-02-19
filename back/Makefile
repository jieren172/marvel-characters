SERVICENAME := marvel-characters
PROFILE := default
STAGE := dev
REGION := us-east-1
BUILD := 0.0.1
REPO := $(shell aws ecr create-repository --region ${REGION} --profile ${PROFILE} --repository-name ${SERVICENAME})
NAME := $(shell aws ecr describe-repositories --region ${REGION} --profile ${PROFILE} | jq -r ".repositories[] | select ( .repositoryName == \"${SERVICENAME}\") | .repositoryUri")
VERSION := $(shell echo `date "+%Y%m%d"`-${BUILD})
ECR_AUTH := $(shell aws --region ${REGION} ecr get-login --profile ${PROFILE} --no-include-email)


.PHONY: clean build publish

all: build

clean:
	@echo "Cleaning up untagged images"
	$(eval dangling := $(shell docker images -f dangling=true -q))
	-docker rmi $(dangling)

build: clean
	docker build -f Dockerfile \
				 -t ${NAME}:back-${VERSION} \
				 .
	@echo built ${NAME}:back-${VERSION}

publish: build
	@echo "Authentication on AWS ECR"
	${ECR_AUTH}
	docker push ${NAME}:back-${VERSION}
