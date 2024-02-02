import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class UserService {
 private user_id: string | null = null;

 setUserId(user_id: string): void {
    this.user_id = user_id;
 }

 getUserId(): string | null {
    return this.user_id;
 }
}