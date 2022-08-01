import express from 'express';
import { serviceSqs } from '../sqs/service';
import { logger } from '../logger';

class ServiceTelemetry {
  async handlePost(req: express.Request, res: express.Response) {
    logger.info('ServiceTelemtry');
    try {
      await serviceSqs.addEventToQueue(req.body);
      res.status(201).end();
    } catch (err) {
      logger.error(err);
      res.status(500).end();
    }
  }
}

export const serviceTelemetry = new ServiceTelemetry();
