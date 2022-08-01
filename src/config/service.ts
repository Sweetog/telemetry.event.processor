import convict from 'convict';
import { resolve } from 'path';
// import { writeFileSync } from 'fs';
// import { join } from 'path';

export const serviceConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8443,
    env: 'PORT',
  },
  sqsUrl: {
    doc: 'The URL for the SQS Queue to read from.',
    format: String,
    default: 'https://sqs.us-east-2.amazonaws.com/165263112220/telemetry-dev',
    env: 'SQS_URL',
  },
  region: {
    doc: 'The default AWS REGION.',
    format: String,
    default: 'us-east-2',
    env: 'REGION',
  },
  logLevel: {
    doc: 'The log level',
    default: 'info',
    env: 'LOGGING_LEVEL',
  },
  openSearchUrl: {
    doc: 'The URL for OpenSearch',
    format: String,
    default: 'https://localhost:9200',
    env: 'OPEN_SEARCH_URL',
  },
  openSearchAuth: {
    doc: 'The basic auth for OpenSearch',
    format: String,
    env: 'OPEN_SEARCH_AUTH',
    default: '',
  },
});

const env = serviceConfig.get('env');
serviceConfig.loadFile(resolve(__dirname, `./${env}.json`));

serviceConfig.validate({ allowed: 'strict' });

//Write env file scratch
// let envStr = '';
// const obj = serviceConfig.getProperties()
// console.log(obj)
// for (const key of Object.keys(obj)) {
//   envStr = envStr + `${key}='${obj[key]}'\n`;
// }
// writeFileSync(join(__dirname, 'env'), envStr);
