import mongoose from 'mongoose';
import { logger } from '../utils/system';

export const connectingToDatebase = async () => {
  try {
    logger.info(`Connecting to database: ${process.env.MONGODB_CONNECTION_STRING}`);

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  } catch (error) {
    console.log(error);
    throw error;
  }

  mongoose.connection.on('error', () => {
    logger.error('Connecting to database error. Please check again!');
    return process.exit();
  });

  mongoose.connection.on('connected', () => {
    logger.warn('Connecting to database successfully!');
  });
};
