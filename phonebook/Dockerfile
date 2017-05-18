FROM mhart/alpine-node
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . .
RUN ls -ls
RUN npm install --production
CMD ["npm", "run", "express"]