FROM node:alpine

WORKDIR /home/node/
COPY files/ipollo-prometheus-exporter.js /home/node/ipollo-prometheus-exporter.js
RUN cd /home/node && npm init -y && npm install http url node-fetch@2.6.1 prom-client dotenv

EXPOSE 9200
CMD [ "node", "ipollo-prometheus-exporter.js" ]
