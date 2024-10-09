import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [];

  private currentAcount = {
    username: '',
  };

  constructor(private storageService: StorageService) {}

  setCurrentAccount(username: string) {
    this.currentAcount.username = username;
  }

  async getCurrentAccount(): Promise<Account> {
    return await this.getAccount(this.currentAcount.username);
  }

  async getAccount(username: string): Promise<Account> {
    const account = await this.storageService.get(username);
    if (!account) {
      throw new Error(`Account with username ${username} not found`);
    }
    return await account;
  }

  async addAccount(username: string, password: string): Promise<void> {
    const account = await this.storageService.get(username);
    if (account) {
      throw new Error(`Account with username ${username} already exists`);
    }
    await this.storageService.set(username, { username, password });
  }

  async deleteAccount(username: string): Promise<void> {
    await this.storageService.remove(username);
  }

  async getAllAccounts(): Promise<Account[]> {
    const accounts = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const account = await this.storageService.get(key);
        accounts.push(account);
      }
    }
    return accounts;
  }
}
