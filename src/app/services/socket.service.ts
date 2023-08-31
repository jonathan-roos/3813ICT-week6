import { Injectable, signal } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../message'

const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  messages = signal<Message[]>([])

  initSocket(){
    this.socket = io(SERVER_URL);
    return () => {this.socket.disconnect()}
  }

  public sendMessage(message: string) {
    this.socket.emit('message', message)
  }

  getMessage(){
    return this.obsFromIO(this.socket,'message');
  }

  private obsFromIO(io:any,eventname:any){
    return new Observable(observer=>{
      io.on(eventname,(data:string)=>{
        let msgdata:Message = new Message(data,new Date,1);
        this.messages.mutate(messages =>{messages.push(msgdata)});
        observer.next(this.messages())
      });
    });
  }

}

  

