import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../../../common/interfaces/expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) { }

  addExpense(payload: Expense) {
    return this.http.post(this.apiUrl, payload);
  }
  getExpenses() {
    return this.http.get(this.apiUrl);
  }
  getPayouts() {
    return this.http.get(`${this.apiUrl}/payouts`);
  }
}
