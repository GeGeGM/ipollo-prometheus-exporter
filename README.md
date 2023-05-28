
# iPollo Prometheus Custom Exporter

## Purpose

This tool aims to export iPollos metrics (temps, fan speed) as Prometheus format in order to monitor it into Grafana.

You need:
- A Prometheus/Grafana stack already up and running
- To run this docker container on a host that's able to reach your iPollos

Once up, your Prometheus will be able to scrap the custom exporter.

[iPollo] <= [Custom_Exporter] <= [Prometheus] <= [Grafana]

## How to 

### Build Docker image

Run `build.sh` in order to build the Docker image.

### Configure your host list

Edit `config.txt` file: Add your host list to it (only working for one host atm)

### Start the docker



## TODO
- Manage several hosts via config file
- Reload config on change