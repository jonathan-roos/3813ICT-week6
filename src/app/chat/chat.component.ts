import { Component, OnInit, signal } from '@angular/core';
import { SocketService } from '../services/socket.service'
import { Message } from '../message'

const SERVER_URL = 'http://localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  constructor(private socketService: SocketService){}

  message= signal("");
  messages = signal<Message[]>([]);

  private initialiseConnection(){
    this.socketService.initSocket();
    this.socketService.getMessage().subscribe ((messages: any) => {
      this.messages.set(messages)
    })
  }

  ngOnInit(){
    this.initialiseConnection()
  }

  sendMessage(){
    if( this.message() ) {
      this.socketService.sendMessage(this.message())
      this.message.set("");
    }else{
      console.log('No message')
    }
    
  }
}
