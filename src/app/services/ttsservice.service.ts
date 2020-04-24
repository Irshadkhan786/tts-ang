import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class TtsService{
    public base_url = "http://localhost:3000/";
    //public base_url = "http://192.168.1.6:3000/";
    //public base_url = "http://192.168.1.126:3000/";
    //public base_url = "http://192.168.1.40:3000/";
    private loginUrl = this.base_url+"login";
    private apigetUrl = "http://localhost/login-demo/welcome/loginService";
    private tokenAuthurl = this.base_url+"authByToken";
    private createUserUrl = this.base_url+"register";
    private getallUserUrl = this.base_url+"getUser";
    private uploadUrl = this.base_url+"upload";
    private deleteUrl = this.base_url+"deleteUser";
    private getUserUrl = this.base_url+"getOneUser";
    private updUserUrl = this.base_url+"updateUser";
    private socialUserUrl = this.base_url+"getallActiveuser";
    private userChatUrl = this.base_url+"getTwoUserChat";

    constructor(private httpClient: HttpClient){
        
    }
    testUpload(fileParam){
       return this.httpClient.post(this.uploadUrl,fileParam)
    }
    doLogin(username,password){
        
      return  this.httpClient.post<any>(this.loginUrl,{userid:username,password},{ observe: 'response' })
      .pipe(retry(1),catchError(this.errorHandler));
    }

    getAllUser(offset,perpage){
        
        return this.httpClient.post<any>(this.getallUserUrl,{offset,perpage},{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler));
    }
    createUser(postData){
        return this.httpClient.post<any>(this.createUserUrl,postData,{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler))
    }
    deleteUser(userid){
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {user_id:userid},
            
          };
          console.log('client');
        return this.httpClient.delete<any>(this.deleteUrl,options)
        .pipe(retry(1),catchError(this.errorHandler));
    }
    getSingelUser(userid){
        return this.httpClient.post<any>(this.getUserUrl,{user_id:userid},{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler))
    }
    updateUser(userObj){
        return this.httpClient.post<any>(this.updUserUrl,userObj,{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler))
    }
    getallSocialUser(userid){
        return this.httpClient.post<any>(this.socialUserUrl,{userid},{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler))
    }
    getchatBetweenUser(from_userid,to_userid){
        return this.httpClient.post<any>(this.userChatUrl,{from_userid,to_userid},{ observe: 'response' })
        .pipe(retry(1),catchError(this.errorHandler))
    }
    private errorHandler(error){

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    checValidLogin(){
        
            this.httpClient.post(this.tokenAuthurl,{},{ observe: 'response' }).subscribe((data)=>{
          });
    }

    isAuthenticated() {

        const user = localStorage.getItem('isExist');
        return (user) ? true : false;
    }

    paginationHelper(total_rec:number,curr_page:number,per_page:number){
        
        let paginator = Array();
        let total_links:number =  Math.ceil(total_rec / per_page);
        var i;
        var num_li_const = 5;

        if(total_links>1 && curr_page!=1){
            paginator.push({
                li_page_number:1,
                li_text:'Fisrt',
                act_cls:''
            })
        }

        //add previous link
        if(total_links>1 && curr_page>1){
            var prev_link = (curr_page-1);
            paginator.push({
                li_page_number:(curr_page-1),
                li_text:'<<',
                act_cls:''
            })
        }

        //impliment case wise condition
        //case 1: if current page vary between 1-5 and total pages are <=5
        if(curr_page>=1 && total_links<=num_li_const){

            for(i=1; i<=total_links; i++){
                
                if(i == curr_page){
                    var act_cls = "active";
                    var li_page_number = i;
                }else{
                    var act_cls = "";
                    var li_page_number = i;
                }
                paginator.push({
                    li_page_number:i,
                    li_text:i,
                    act_cls:act_cls
                })
            }
        }
        //case 2: if current page vary between 1-5 and total pages are <=10
        //if(curr_page>=1 && total_links<=(num_li_const*2) && (curr_page+num_li_const)<=total_links){
        if(curr_page>=1 && total_links>num_li_const && total_links<=(num_li_const*2)){

            for(i=1; i<=total_links; i++){

                if(i == curr_page){
                    var act_cls = "active";
                    var li_page_number = i;
                }else{
                    var act_cls = "";
                    var li_page_number = i;
                }
                paginator.push({
                    li_page_number:i,
                    li_text:i,
                    act_cls:act_cls
                })
            }
        }else if(curr_page>=1 && curr_page<=num_li_const && (curr_page+num_li_const)<total_links){
            //case 3: if current page vary between 1-5 and total pages are >10
            for(i=1; i<=(curr_page+(num_li_const-1)); i++){
                if(i == curr_page){
                    var act_cls = "active";
                }else{
                    var act_cls = "";
                }
    
                paginator.push({
                    li_page_number:i,
                    li_text:i,
                    act_cls:act_cls
                })
            }
            paginator.push({
                li_page_number:(paginator.length+1),
                li_text:'...',
                act_cls:'disabled'
            })
        }else if((curr_page-num_li_const)>=1 && (curr_page+num_li_const)<=total_links){
            //case 4: if current page >6 and <(totat record-5)//...6,7,8,9,10,...
            paginator.push({
                li_page_number:(paginator.length+1),
                li_text:'...',
                act_cls:'disabled'
            })
            
            for(i=(curr_page-(num_li_const-1)); i<=(curr_page+(num_li_const-1)); i++){
                if(i == curr_page){
                    var act_cls = "active";
                }else{
                    var act_cls = "";
                }
    
                paginator.push({
                    li_page_number:i,
                    li_text:i,
                    act_cls:act_cls
                })
            }
            paginator.push({
                li_page_number:(paginator.length+1),
                li_text:'...',
                act_cls:'disabled'
            })
                
        }else if((curr_page+num_li_const)>total_links && (curr_page-num_li_const)>=1){
            //case 4: if current page >6 and >(totat record-5)//...6,7,8,9,10
            paginator.push({
                li_page_number:(paginator.length-1),
                li_text:'...',
                act_cls:'disabled'
            })
            for(i=(curr_page-num_li_const-1); i<=total_links; i++){
                //remove link form active pagination and add active class
                if(i == curr_page){
                    var act_cls = "active";
                }else{
                    var act_cls = "";
                }
        
                paginator.push({
                    li_page_number:i,
                    li_text:i,
                    act_cls:act_cls
                })
            }
        }
        //add next link and last link
        if(total_links>2 && curr_page<(total_links)){
            paginator.push({
                li_page_number:curr_page+1,
                li_text:'>>',
                act_cls:''
            })
            paginator.push({
                li_page_number:total_links,
                li_text:'Last',
                act_cls:''
            })
        }
    
        
        return paginator;
    }
    
}