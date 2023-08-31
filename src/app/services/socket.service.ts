import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  initSocket(){
    this.socket = io(SERVER_URL);
    return () => {this.socket.disconnect()}
  }

  public sendMessage(message: string) {
    this.socket.emit('message', message)
  }

  getMessage(next: any){
    this.socket.on('message', (message: any) => next (message));
    }
  }

  

