import express from 'express';
import { payoutRoute } from '../controllers/payoutRoute';

export const routes = express.Router();
routes.use('/expenses', payoutRoute);