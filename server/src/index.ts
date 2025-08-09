import path from 'path';
import { config } from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes';
import errorHandler from './middlewares/errorHandler';
import { sequelize } from './models/models';

config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', router); 
app.use(express.static('public'));
app.get('/favicon.ico', (_req: Request, res: Response) => res.status(204).end());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get(/^\/(?!r\/|stats\/).*/, (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established');
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
})();