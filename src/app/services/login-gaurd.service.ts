import { Injectable } from '@angular/core';
import { CanActivate , Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TtsService } from './ttsservice.service'
@Injectable()
export class Logingaurd implements CanActivate {

    constructor(private router:Router,private ttsservice:TtsService){
        
    }
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        
            if(localStorage.getItem("x-auth")){
                return true;
            }else{
                return false;
            }    
        
    }
    
    
} 