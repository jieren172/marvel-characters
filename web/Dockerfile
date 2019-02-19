FROM ubuntu:18.04

########################################
#                                      #
#        Container preparation         #
#                                      #
########################################

WORKDIR /tmp
RUN apt-get update && \
    apt-get install -y build-essential software-properties-common curl


# Install node 8.x
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash && apt-get install -y nodejs


########################################
#                                      #
#       Preparing for execution        #
#                                      #
########################################


# Copying executable files
COPY ./              /usr/local/bin/web

WORKDIR /usr/local/bin/web

RUN npm install --unsafe-perm

CMD [ "npm", "start" ]
