import { Debt } from './debt'

export interface Payout {
  total: number;
  equalShare: number;
  payouts: Debt[]
}