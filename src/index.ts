import express from 'express';
import { servicePing } from './ping/service';
import { serviceTelemetry } from './telemetry/service';
import { serviceConfig } from './config/service';
import initializeSQSPolling from './sqs/processor';
import https from 'https';
import fs from 'fs';
import { logger } from './logger';

const privateKey = fs.readFileSync('./cert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('./cert/selfsigned.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(express.json());

const PORT = serviceConfig.get('port');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  await servicePing.handleGet(req, res);
});

app.post('/event', async (req, res) => {
  await serviceTelemetry.handlePost(req, res);
});

initializeSQSPolling();

const httpsServer = https.createServer(credentials, app);

logger.info(`ENVIRONMENT ${serviceConfig.get('env')}`);
logger.info(`PROXY LISTING ON PORT ${serviceConfig.get('port')}`);


httpsServer.listen(PORT);
// app.listen(PORT, () => logger.info`Server listening in port ${PORT}`));
