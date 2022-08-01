import { logger } from '../logger';
import { serviceSqs } from './service';
import { Message } from '@aws-sdk/client-sqs';
import { openSearchService } from '../open-search/service';
import { compact } from 'lodash';

export const pollSQS = async () => {
  try {
    logger.info('polling SQS queue');
    const res = await serviceSqs.receiveMessageFromQueue();
    if (res.Messages) {
      logger.info('processing SQS messages, count: ', res.Messages.length);
      const currentEvents: Array<Promise<Message | undefined>> = res.Messages.map(messageHandler);
      const results = await Promise.all(currentEvents);
      logger.info(`event processing results: ${JSON.stringify(results.filter((el) => el))}`);
      await serviceSqs.deleteMessagesFromQueue(compact(results));
    }
  } catch (err) {
    logger.info(`Caught error inside pollSQS: ${err}`);
    logger.error(err);
  }
};

async function messageHandler(msg: Message) {
  if (!msg.Body) return;
  const payload = JSON.parse(msg.Body);
  const source = payload.source;
  logger.info(`handling event ${payload.eventName}`);
  payload['@timestamp'] = new Date().toISOString();
  await openSearchService.processEvent(payload, source);
  logger.info(`completed processing ${payload.eventName}`);
  return msg;
}

const initializeSQSPolling = async () => {
  logger.info('initializing SQS Polling');
  while (true) {
    try {
      await pollSQS();
    } catch {}
  }
};

export default initializeSQSPolling;
