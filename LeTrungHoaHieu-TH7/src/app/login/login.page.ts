import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

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

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Email và mật khẩu không được để trống');
      return;
    }

    try {
      const account = await this.accountService.getAccount(this.email);
      if (account.password === this.password) {
        this.accountService.setCurrentAccount(this.email);
        this.router.navigate(['home']);
      } else {
        alert('Sai mật khẩu');
      }
    } catch (error) {
      alert('Tài khoản không tồn tại');
    }
  }

  async addAccount() {
    if (!this.email || !this.password) {
      alert('Email và mật khẩu không được để trống');
      return;
    }

    try {
      const account = await this.accountService.getAccount(this.email);
      if (account) {
        alert(`Tài khoản ${this.email} đã có sẵn`);
        return;
      }
    } catch (error) {
      // Account does not exist, proceed to add it
      await this.accountService.addAccount(this.email, this.password);
      alert(`Tài khoản ${this.email} vừa được thêm`);
    }
  }

  async deleteAccount() {
    if (!this.email) {
      alert('Email và mật khẩu không được để trống');
      return;
    }
    try {
      const account = await this.accountService.getAccount(this.email);
      if (account) {
        await this.accountService.deleteAccount(this.email);
        alert(`Tài khoản ${this.email} đã bị xóa`);
      }
    } catch (error) {
      alert(`Tài khoản ${this.email} không tồn tại`);
    }
  }

  async getAllAccounts() {
    const accounts = await this.accountService.getAllAccounts();
    let message = 'Tất cả tài khoản: ';
    if (accounts.length !== 0) {
      for (let i = 0; i < accounts.length; i++) {
        message += `\n${i} - ${accounts[i].username} `;
      }
      alert(message);
    } else {
      alert('Không có tài khoản nào');
    }
  }
}
