import { Expense } from "../models/expense";
const expenses: Expense[] = [];

export function addExpense(expense: Expense) {
  expenses.push(expense);
}

export function getExpense() {
  return expenses;
}

export function getShares() {
  const numOfExpenses = expenses.length;
  const total = expenses.reduce((total, expense) => total + expense.amount, 0);
  const equalShare = total / numOfExpenses;
  return { total, equalShare };
}

function shareExpense() {
  const { equalShare } = getShares();
  const amountsOwed = expenses.map((expense) => {
    const amountOwed = equalShare - expense.amount;
    return { name: expense.name, amountOwed: amountOwed };
  });
  return amountsOwed;
}

export function calculateDebts() {
  const amountsOwed = shareExpense();
  const payouts = []
  amountsOwed.forEach((person) => {
    if (person.amountOwed < 0) {
      amountsOwed.forEach((otherPerson, index) => {
        if (otherPerson.amountOwed > 0) {
          const amountToPay = Math.min(Math.abs(person.amountOwed), otherPerson.amountOwed);
          if (amountToPay > 0) {
            payouts.push({ owed: otherPerson.name, owes: person.name, amount: amountToPay });
            person.amountOwed += amountToPay;
            otherPerson.amountOwed -= amountToPay;
          }
        }
      });
    }
  });

  return payouts;
}