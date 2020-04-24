import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
    selector:'tts_header',
    templateUrl:'./tts_header.component.html'
})
export class Ttsheader{

    constructor(private router:Router){

    }
    logout(){
        localStorage.removeItem("x-auth");
        localStorage.removeItem("id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_contact");
        localStorage.removeItem("user_org");
        localStorage.removeItem("user_desig");
        this.router.navigate(['/login']);
    }
}