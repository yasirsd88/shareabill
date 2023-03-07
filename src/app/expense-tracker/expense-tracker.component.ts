import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Expense } from '../../../common/interfaces/expense'
import { Debt } from '../../../common/interfaces/debt'
import { Payout } from '../../../common/interfaces/payouts'
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css']
})
export class ExpenseTrackerComponent implements OnInit {
  public expenseForm: UntypedFormGroup;

  expenses: Expense[] = [];
  debts: Debt[] = [];
  equalShare: number = 0;
  total: number;
  constructor(
    private readonly fb: UntypedFormBuilder,
    private expenseService: ExpenseService
  ) {
    this.total = 0;
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    })
  }
  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this.total = 0;
    this.expenseService.getExpenses().subscribe(
      (response) => {
        this.expenses = response as Expense[];
      }
    )
  }
  getPayout() {
    this.expenseService.getPayouts().subscribe((result) => {
      const payout = (result as Payout);
      this.debts = payout.payouts
      this.equalShare = payout.equalShare;
      this.total = payout.total;
    }
    );
  }

  public save() {
    this.expenseService.addExpense(this.expenseForm.value)
      .subscribe(
        () => {
          this.expenseForm.reset();
          this.getExpenses();
        }
      );

    ;
  }
}