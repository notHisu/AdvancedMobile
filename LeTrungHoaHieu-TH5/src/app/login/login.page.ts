import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor(private router: Router, private accountService: AccountService) {
    this.email = '';
    this.password = '';
  }

  onLogin() {
    const account = this.accountService.getAccount();
    if (this.email === account.id && this.password === account.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
