import { Component,OnInit } from '@angular/core'
import { TtsService } from './../../services/ttsservice.service';
@Component({
    selector:'all-chat-user',
    templateUrl:'./socialuser.component.html'
})
export class Socialuser implements OnInit{

    userList:any;
    username:any;
    constructor(private service:TtsService){
        this.username = localStorage.getItem('user_name');
    }

    ngOnInit(){
        /* this.service.getallSocialUser().subscribe((userdata)=>{
            console.log(userdata)
        },(error)=>{
            console.log(error)
        }) */
    }

}