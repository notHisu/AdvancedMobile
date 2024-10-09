import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  account: Account | undefined;

  constructor(private router: Router, private accountService: AccountService) {}

  async ngOnInit() {
    this.account = await this.accountService.getCurrentAccount();
  }

  viewAccountDetails() {
    this.router.navigate(['/account-details']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
