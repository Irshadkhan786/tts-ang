import { Component } from '@angular/core';
@Component({
    selector:'sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['sidebar.component.css']
})

export class Sidebar{
    
    username;
    userimage;
    imgBasepath:any = "http://localhost:3000/user";
    
    constructor(){
        this.username = localStorage.getItem('user_name');
        let userImg = localStorage.getItem('user_image');
        this.userimage = this.imgBasepath+"/"+userImg;
    }
}