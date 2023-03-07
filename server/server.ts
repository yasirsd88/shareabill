import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/index'
import cors from 'cors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening http://${HOST}:${PORT}`);
});
