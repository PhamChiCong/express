import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: 'Too many request from this IP, please try again after',
});

export default limiter;
