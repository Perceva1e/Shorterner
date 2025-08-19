import { config } from 'dotenv';
config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes';
import errorHandler from './middlewares/errorHandler';
import { sequelize } from './models/db';

const app: Express = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173', 'http://client:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log('CORS Origin:', origin); 
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', router);
app.use(express.static('public'));
app.get('/favicon.ico', (_req: Request, res: Response) => res.status(204).end());

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