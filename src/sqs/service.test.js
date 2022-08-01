import { serviceSqs } from './service';

describe('SqsService', () => {
  it('should queue, dequeue and delete a SQS message', async () => {
    const resp = await serviceSqs.addEventToQueue({
      source: 'jest-test',
      type: 'test',
    });
    expect(resp.$metadata.httpStatusCode).toBe(200);

    const dequeued = await serviceSqs.receiveMessageFromQueue();
    expect(dequeued.Messages?.length).toBeGreaterThanOrEqual(1);

    const toDelete = dequeued.Messages?.map(async (m) => serviceSqs.deleteMessageFromQueue(m.ReceiptHandle));
    expect(toDelete.length).toBeGreaterThanOrEqual(1);
    const deleteResults = await Promise.all(toDelete ?? []);
    // AWS SQS returns 200 whether or not the message was actually deleted
    // so point less to test response code
    expect(deleteResults.length).toBeGreaterThanOrEqual(1);
  });
});
