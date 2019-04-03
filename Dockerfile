#Choose environment
FROM node:8.15

# Set the working directory to /srv
WORKDIR /srv/nodejs-base

ADD package*.json /srv/nodejs-base/

# Install dependencies
RUN npm install 

# Copy the current directory contents into the container at /app
COPY . /srv/nodejs-base/

# Gen docs
RUN ./gendoc.sh

# Make port available to the world outside this container
EXPOSE 2019

# Run app.js when the container launches
CMD ["./wait-for-it.sh", "${MYSQL_HOST}:${MYSQL_PORT}", "--", "npm", "start"]

