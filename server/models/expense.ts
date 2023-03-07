import { Expense as ExpenseInterface } from '../../common/interfaces/expense';

export class Expense implements ExpenseInterface {
  name: string;
  amount: number;
}