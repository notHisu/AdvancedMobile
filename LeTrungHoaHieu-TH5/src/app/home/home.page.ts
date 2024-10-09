import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { Account } from '../model/account.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  account: Account;
  constructor(private router: Router, private accountService: AccountService) {
    this.account = accountService.getAccount();
  }

  viewAccountDetails() {
    this.router.navigate(['/account-details']);
  }
}
