import { Component } from '@angular/core'
import { TtsService } from './../services/ttsservice.service';
import { Router } from '@angular/router';
@Component({
    'selector':'login-app',
    templateUrl:'login.component.html'
})

export class Login {
    
    isLogin:boolean = false;
    constructor(private ttsService:TtsService,private router:Router){
        
        if(localStorage.getItem('x-auth')){
            this.router.navigate(['/dashboard'])
        }
    }

    submtLogin(formObj){
        var valueobj = formObj.value;
        let username = valueobj.username;
        let password = valueobj.password;
        this.ttsService.doLogin(username,password).subscribe((login_data)=>{

        if(login_data.body.status == 1){

            var login_token = login_data.headers.get('x-auth');
            localStorage.setItem("x-auth", login_token);
            localStorage.setItem("id", login_data.body.data._id);
            localStorage.setItem("user_name", login_data.body.data.name);
            localStorage.setItem("user_email", login_data.body.data.email);
            localStorage.setItem("user_contact", login_data.body.contact);
            localStorage.setItem("user_org", login_data.body.data.organisation);
            localStorage.setItem("user_desig", login_data.body.data.designation);
            localStorage.setItem("user_image", login_data.body.data.userimage);
            this.router.navigate(['/dashboard']);
        }else{
            this.isLogin = true;
        }
           
        },(error:Response)=>{
            console.log('error found');
        });

        

    }
}

