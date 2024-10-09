import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async get(key: string): Promise<any> {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
