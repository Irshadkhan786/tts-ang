import { Component, OnInit } from '@angular/core';
import { WebsocketserviceService } from './../../services/websocketservice.service'
import { TtsService } from './../../services/ttsservice.service';
import * as moment from 'moment';
import * as dateformat from 'dateformat';
declare var $:any;
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  username:any;
  userimage;
  imgBasepath:any = "http://localhost:3000/user";
  userlist:any;
  curr_user_id:any;
  message:any;
  toUsername:any;
  toUserId:any;
  fromUsername:any;
  fromUserId:any;
  chat_array:any;
  constructor(private socket:WebsocketserviceService,private service:TtsService) {
    this.imgBasepath = service.base_url;
     this.curr_user_id = localStorage.getItem("id");
     this.fromUserId = localStorage.getItem('id');
     this.fromUsername = localStorage.getItem('user_name');
      this.service.getallSocialUser(this.curr_user_id).subscribe((userdata)=>{
        
        if(userdata.body.status==1){
          this.userlist = userdata.body.res;
          console.log(this.userlist);
        }else{
          this.userlist = Array();
        }
      },(error)=>{
          console.log('server side error',error)
      })

    this.username = localStorage.getItem('user_name');
    let userImg = localStorage.getItem('user_image');
    this.userimage = this.imgBasepath+"user/"+userImg;
  }

  ngOnInit() {
     //1
      this.socket.listen('connect').subscribe((data)=>{
        //2
        this.socket.emit('getAllOnlineUser',{
          userId:this.curr_user_id,
          userSocketId:this.socket.socket.id,
        })
      })
      //3
      this.socket.listen('allOnlineUser').subscribe((data)=>{
        console.log(data);
        this.userlist = data;
      })

      this.socket.listen('transferMessage').subscribe((data:any)=>{
        this.chat_array.push(data);
        this.message = '';       
      })
    
  }
 
  sendMessage(){
    this.socket.emit('sendPrivateMessage',{
      from:this.fromUsername,
      fromId:this.fromUserId,
      to:this.toUsername,
      toId:this.toUserId,
      text:this.message
    })
  }

  activateToUser(user){
    
    this.toUserId = user._id;
    this.toUsername = user.name
    console.log(this.fromUserId,this.toUserId)
    //get chat data between two users
    this.service.getchatBetweenUser(this.fromUserId,this.toUserId).subscribe((chat_data)=>{
      this.chat_array = chat_data.body.chat_data;
      console.log(this.chat_array)
    },(error)=>{
      console.log('error in chat data')
    })
  }

  timeFormate(dateTime){
   return dateformat(dateTime, "h:MM:ss TT");
  }
}
