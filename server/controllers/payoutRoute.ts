import { Router } from 'express';
import { addExpense, calculateDebts, getExpense, getShares } from '../services/expense';
import { Expense } from '../models/expense';
import { body, validationResult } from 'express-validator';

export const payoutRoute = Router();

payoutRoute.get('/', (req, res) => {
  const expenses = getExpense();
  res.send(expenses);
});

payoutRoute.get('/payouts', (req, res) => {
  const payouts = calculateDebts();
  const { total, equalShare } = getShares();
  res.send({ total, equalShare, payouts });
});

payoutRoute.post('/',
  body('name').notEmpty(),
  body('amount').isDecimal(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, amount } = req.body as Expense;
    addExpense({ name, amount });
    res.send()
  }
);
