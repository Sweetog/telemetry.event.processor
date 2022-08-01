import { serviceSqs } from '../src/sqs/service';
import { writeFileSync } from 'fs';
import { join } from 'path';
import counter from './counter';
const FILE_PATH = join(__dirname, 'counter.ts');

const runner = async () => {
  console.log('counter: ', counter);

  /**
   * queue message
   */
  const queued = await serviceSqs.addEventToQueue({
    type: 'test',
    source: 'sandbox',
    eventName: 'pack',
  });
  console.log('queued', queued['$metadata'].httpStatusCode);

  /**
   * dequeue
   */
  //   const dequeued = await serviceSqs.receiveMessageFromQueue();
  //   console.log(dequeued);
  //   console.log('dequeued.Messages.length', dequeued.Messages?.length);
  //   //   console.log('dequeued.Messages', dequeued.Messages);

  //   /**
  //    * delete
  //    */
  //   const toDelete = dequeued.Messages?.map(async (m) => serviceSqs.deleteMessageFromQueue(m.ReceiptHandle));
  //   console.log('toDelete', toDelete);
  //   const deleteResults = await Promise.all(toDelete ?? []);
  //   console.log('deleteResults', deleteResults);

  //   const dequeuedAfter = await serviceSqs.receiveMessageFromQueue();
  //   console.log('AFTER dequeuedAfter.Messages.length', dequeuedAfter.Messages?.length);
};

runner().then(() => {
  writeFileSync(FILE_PATH, `const counter = ${counter + 1};export default counter;`);
  console.log('Done');
});
