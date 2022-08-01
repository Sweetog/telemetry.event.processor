import { Client } from '@opensearch-project/opensearch';
import { logger } from '../logger';
import { serviceConfig } from '../config/service';

class OpenSearchService {
  host = serviceConfig.get('openSearchUrl');
  auth = serviceConfig.get('openSearchAuth');
  protocol = 'https';

  client = new Client({
    node: this.protocol + '://' + this.auth + '@' + this.host,
  });

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
    logger.info(`creating OpenSearch document for source/index: ${index}`);
    await this.createDocument(payload, index);
  }
}

export const openSearchService = new OpenSearchService();
