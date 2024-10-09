import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  account: Account | undefined;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getCurrentAccount().then((account) => {
      this.account = account;
    });
  }
}
