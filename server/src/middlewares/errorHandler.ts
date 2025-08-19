import { Request, Response, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;