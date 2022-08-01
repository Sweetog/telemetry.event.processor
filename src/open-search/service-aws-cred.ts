import { Client } from '@opensearch-project/opensearch';
import { logger } from '../logger';
import { serviceConfig } from '../config/service';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import createAwsOpensearchConnector from 'aws-opensearch-connector';

const host = serviceConfig.get('openSearchUrl');
const region = serviceConfig.get('region');

const getClient = async () => {
  const awsCredentials = await defaultProvider()();
  const connector = createAwsOpensearchConnector({
    credentials: awsCredentials,
    region,
    getCredentials: function (cb) {
      return cb();
    },
  });
  return new Client({
    ...connector,
    node: host,
  });
};

class OpenSearchService {
  client;

  async createDocument(document, index) {
    logger.info('Adding document:');
    const response = await this.client.index({
      index,
      body: document,
      refresh: true, //If true, OpenSearch refreshes shards to make the reindex operation available to search results
    });
    logger.info(response.body);
  }

  async processEvent(payload, index) {
    if (!this.client) {
      logger.info(`creating OpenSearch client, host: ${host}`);
      this.client = await getClient();
    }
    logger.info(`creating OpenSearch document for source/index: ${index}`);
    await this.createDocument(payload, index);
  }
}

export const openSearchService = new OpenSearchService();
