import { pollSQS } from './processor';
import { serviceSqs } from './service';

describe.skip('SqsProcessor', () => {
  it('TODO should poll queue and handle message', async () => {
    const queued = await serviceSqs.addEventToQueue({
      source: 'sandbox',
      type: 'event',
    });

    expect(queued.$metadata.httpStatusCode === 200);
  });
});
