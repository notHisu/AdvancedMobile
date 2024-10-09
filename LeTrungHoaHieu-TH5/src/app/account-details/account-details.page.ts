import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Account } from '../model/account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  account: Account;

  constructor(private accountService: AccountService) {
    this.account = this.accountService.getAccount();
  }

  ngOnInit() {
    this.account = this.accountService.getAccount();
  }
}
