import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmitter = new EventEmitter<boolean>();

  constructor() { }
}
