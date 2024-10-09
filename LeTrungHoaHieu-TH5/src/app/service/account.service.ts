import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account: Account = {
    id: '2115208@gmail.com',
    password: '1234',
    balance: 100000,
  };
  constructor() {}

  getAccount(): Account {
    return this.account;
  }
}
