import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service'

const SERVER_URL = 'http://localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  constructor(private socketService: SocketService){}

  message: string = '';
  messages: string[] = [];


  ngOnInit(){
    this.socketService.initSocket();
    this.socketService.getMessage((message: string)=>{this.messages.push(message)})
  }

  sendMessage(){
    this.socketService.sendMessage(this.message)
  }
}
