import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {
  socket:any;
  socketurl:string = "http://localhost:3000/";
  //socketurl:string = "http://192.168.1.6:3000/";
  //socketurl:string = "http://192.168.1.126:3000/";
  //socketurl:string = "http://192.168.1.40:3000/";
  
  constructor() {
    this.socket = io(this.socketurl)
   }
  
  listen(eventname:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventname,(data)=>{
        subscriber.next(data)
      })
    })
  }
  emit(eventname:string,data:any){
    this.socket.emit(eventname,data)
  }
}
