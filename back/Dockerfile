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
COPY ./              /usr/local/bin/back

WORKDIR /usr/local/bin/back

RUN npm install --unsafe-perm && chmod a+x /usr/local/bin/back/src/index.js

ENTRYPOINT ["/usr/local/bin/back/src/index.js"]
