/*
    Prometheus custom exporter for iPollo devices
*/

const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
const client = require('prom-client');
/* *** *** *** */
const INTERVAL = 1*1000;
const CLIENT_PATH = "/cgi-bin/luci/admin/ipollo_main/ipollo_realtime";
const SERVER_PORT = 9200;
/* *** *** *** */
var   host;
var   content = "";

// *** *** ***
// *** *** ***
// *** *** ***

function run() {

var full_path = "http://" + host + CLIENT_PATH;
let settings = { method: "Get" };
fetch(full_path, settings)
    .then(res => res.json())
    .then((json) => {
        console.log(json.temp0 + " | " + json.temp1 + " | " + json.fanspeed0 + " | " + json.fanspeed3);
        //content_temp = 'hashrate{device="' + host + '"} ' + json.hashrate + '\n';// remove "M"
        //content_temp+= 'hashrate_cur{device="' + host + '"} ' + json.hashratecur + '\n';
        content_temp = "";
        if (json.temp0 != "0.0") {content_temp+= 'temp_celsius{device="' + host + '",id="' + 0 + '"} ' + json.temp0 + '\n';}
        if (json.temp1 != "0.0") {content_temp+= 'temp_celsius{device="' + host + '",id="' + 1 + '"} ' + json.temp1 + '\n';}
        if (json.temp2 != "0.0") {content_temp+= 'temp_celsius{device="' + host + '",id="' + 2 + '"} ' + json.temp2 + '\n';}
        if (json.temp3 != "0.0") {content_temp+= 'temp_celsius{device="' + host + '",id="' + 3 + '"} ' + json.temp3 + '\n';}
        content_temp+= 'fan_speed{device="' + host + '",id="' + 0 + '"} ' + json.fanspeed0 + '\n';
        content_temp+= 'fan_speed{device="' + host + '",id="' + 1 + '"} ' + json.fanspeed1 + '\n';
        content_temp+= 'fan_speed{device="' + host + '",id="' + 2 + '"} ' + json.fanspeed2 + '\n';
        content_temp+= 'fan_speed{device="' + host + '",id="' + 3 + '"} ' + json.fanspeed3 + '\n';
        content_temp+= 'fan_pwm{device="' + host + '",id="' + 0 + '"} ' + json.fanpwm0 + '\n';
        content_temp+= 'fan_pwm{device="' + host + '",id="' + 1 + '"} ' + json.fanpwm1 + '\n';
        content_temp+= 'fan_pwm{device="' + host + '",id="' + 2 + '"} ' + json.fanpwm2 + '\n';
        content_temp+= 'fan_pwm{device="' + host + '",id="' + 3 + '"} ' + json.fanpwm3 + '\n';
        content = content_temp;
    });
    setTimeout(run, INTERVAL);
}

// *** *** ***
// *** *** ***
// *** *** ***

require('dotenv').config({ path: 'config.txt' });
host = process.env.HOST;
console.log("HOST: "+host);

// Create a Registry which registers the metrics
const register = new client.Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'ipollo'
})
// Define the HTTP server
const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname
  if (route === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(content);
  }
})

server.listen(SERVER_PORT);
run();
