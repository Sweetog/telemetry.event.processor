# telemetry-eventprocessor

* [system diagram](architecture.pdf)

## Examples
* `node examples/send-events/https.js` //send an event

## Deploy process
* `npm run clean` //local
* `scp -ri ~/.ssh/telemetry-proxy.pem ~/Developer/telemetry-eventprocessor/* ec2-user@<ip-address>:~/telemetry-eventprocessor` //cp code to remote
* `ssh -i ~/.ssh/telemetry-proxy.pem ec2-user@<ip-address>` //remote into EC2
* `cd telemetry-eventprocessor`
* `npm ci`
* `npm run build:prod` //build docker image and spin up a container
* _ultimately will just build new images in Jenkins, push to Docker image repository and trigger deploy_


## EC2
* `ssh -i ~/.ssh/telemetry-proxy.pem ec2-user@<ip-address>`
* 443/HTTPS ingress routed to `8443`
    * `sudo iptables -t nat -L`
    * `sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 8443` //443 traffic redirect rule
* Docker container listening on `8443`

## Docker/Deploy
* `npm run build:prod` (_cwd on EC2_)

## OpenSearch
* dev ssh tunnel:
    * `ssh -i ~/.ssh/telemetry-proxy.pem ec2-user@<ip-address> -N -L 9200:<opensearch-dev-url>`
* prod ssh tunnel:
    * `ssh -i ~/.ssh/telemetry-proxy.pem ec2-user@<ip-address> -N -L 9200:<opensearch-prod-url>:443`
* `https://localhost:9200/_dashboards`
* `get OpenSearch creds from `src/config/production.json` and `telemetry-proxy.pem` from EC2 admin`