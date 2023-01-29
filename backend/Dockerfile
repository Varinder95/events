# From base image node
FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copying all the files from your file system to container file system
COPY ./ .

# Install all dependencies
RUN npm install

# Expose the port
EXPOSE 4000

# Command to run app when intantiate an image
CMD ["npm","start"]