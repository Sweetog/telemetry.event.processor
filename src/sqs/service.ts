import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  //   DeleteMessageBatchCommandInput,
  DeleteMessageBatchCommand,
  Message,
} from '@aws-sdk/client-sqs';
import { serviceConfig } from '../config/service';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const sqsUrl = serviceConfig.get('sqsUrl');
const sqsRegion = serviceConfig.get('region');
// const credentials = { accessKeyId: serviceConfig.get('accessKeyId'), secretAccessKey: serviceConfig.get('secretAccessKey') };
// const sqsClient = new SQSClient({ region: sqsRegion, credentials });

const sqsQueueParams = {
  AttributeNames: ['All'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: sqsUrl,
  // Visibility timeout sets the length of time that a message received from a queue
  // (by one consumer) will not be visible to the other message consumers.
  //VisibilityTimeout: 60, //default is 30
  // The receive message wait time is the maximum amount of time
  // that polling will wait for messages to become available to receive.
  // Long polling helps reduce the cost of using Amazon SQS
  // by eliminating the number of empty responses
  WaitTimeSeconds: 20,
  ReceiveRequestAttemptId: '0',
};

const getClient = async () => {
  const credentials = await defaultProvider()();
  return new SQSClient({ region: sqsRegion, credentials });
};

class SqsService {
  client;

  async clientSend(cmd) {
    if (!this.client) {
      this.client = await getClient();
    }
    return await this.client.send(cmd);
  }

  async addEventToQueue(event) {
    const params = {
      QueueUrl: sqsUrl,
      MessageBody: JSON.stringify(event),
      DelaySeconds: 1,
    };
    const cmd = new SendMessageCommand(params);
    return await this.clientSend(cmd);
  }

  async receiveMessageFromQueue() {
    const cmd = new ReceiveMessageCommand(sqsQueueParams);
    return await  this.clientSend(cmd);
  }

  async deleteMessageFromQueue(receiptHandle?: string) {
    const cmd = new DeleteMessageCommand({ ReceiptHandle: receiptHandle, QueueUrl: sqsUrl });
    return await this.clientSend(cmd);
  }

  async deleteMessagesFromQueue(messages: Array<Message>) {
    const params = {
      QueueUrl: sqsUrl,
      Entries: messages.map((m) => ({ Id: m.MessageId, ReceiptHandle: m.ReceiptHandle })),
    };
    const cmd = new DeleteMessageBatchCommand(params);
    return await this.clientSend(cmd);
  }
}

export const serviceSqs = new SqsService();
