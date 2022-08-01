import express from 'express';

class ServicePing {
  async handleGet(req: express.Request, res: express.Response) {
    res.status(201).send('Its Alive!');
  }
}

export const servicePing = new ServicePing();
