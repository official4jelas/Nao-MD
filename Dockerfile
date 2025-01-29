FROM node:18

Set working directory
WORKDIR /usr/src/app

Copy package files and install dependencies
COPY package.json ./
RUN npm install

Install system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp tmate && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

Copy the rest of the application files
COPY . .

Expose the required port
EXPOSE 2222

Command to run the application
CMD ["tmate", "-S", "/tmp/tmate.sock", "-p", "2222"]
