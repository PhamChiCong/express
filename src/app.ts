import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { allowHeaders } from './middlewares/header.middleware';
import limiter from './helpers/limit.request';
import { regulators } from './middlewares/regulators';
import { customResponse } from './helpers/express.extends';
import { errorHandler } from './middlewares/error.handle.middleware';
import { swaggerDocument } from './docs';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { connectingToDatebase } from './databases';
// import { running_all_job } from './jobs';
import { logger } from './utils/system';

class App {
  public express

  constructor() {
    this.express = express();
  }

  public async init() {
    await connectingToDatebase();
    this.express.use(customResponse);
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(limiter);
    this.express.use(helmet());
    this.express.use(allowHeaders);
    this.express.use(cookieParser());

    if (regulators && regulators.length) {
      regulators.forEach((r) => this.express.use(r));
    }

    //-- load swagger doc
    this.express.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    this.express.use('/health-check', (req, res) => res.json({ success: true }));

    //-- load controllers
    const controllers = require('./controllers');
    Object.keys(controllers).forEach(c => {
      this.express.use(`/api/v1/${controllers[c].base}`, controllers[c]);
    });

    // Error handler
    this.express.use(errorHandler);
  }

  public start(port: number) {
    this.express.listen(port, (err) => err ? console.log(err) : logger.info(`App running on port: ${port}`));
  }
}

export default new App();
