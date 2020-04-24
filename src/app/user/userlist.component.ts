import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TtsService } from './../services/ttsservice.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var $:any;
@Component({
    selector:'userlist',
    templateUrl:'./userlist.component.html'
})

export class Userlist{
    userList:any = [];
    pageLinks:any;

    curPageNum:number;
    perPage:number = 5;
    offset:number;
    totalDocuments:number;
    isDeleteuser:Boolean = false;
    deleteUserObject:any;
    delete_response:any;
    constructor(private service:TtsService,private router:Router,private actRoute:ActivatedRoute,private spinner: NgxSpinnerService){
        
        
        
    }
    ngOnInit(){
        this.actRoute.params.subscribe((routeData)=>{
            this.getAllUser(routeData.pageno);
        })
    }
    getAllUser(pageno){
        this.spinner.show();
        /*=== logic for pagination ===*/
        //this.curPageNum = +this.actRoute.snapshot.paramMap.get('pageno');
        this.curPageNum = +pageno;
        if(!this.curPageNum){
            this.curPageNum = 1;
        }
        this.offset = (this.curPageNum-1)*this.perPage;
        /*=== logic for pagination ends ===*/
        this.service.getAllUser(this.offset,this.perPage).subscribe((userData)=>{
            if(userData.body.status == 1){
                this.userList = userData.body.res;
                this.totalDocuments =  userData.body.total_rec;
                this.pageLinks = this.service.paginationHelper(this.totalDocuments,this.curPageNum,this.perPage);
                setTimeout(()=>{
                    this.spinner.hide();
                },1000)
            }else{
                
            }
        },(error)=>{
            this.spinner.hide();
            console.log('error')
        })
    }
    
    confirmDeleteUser(user,event){
        
        this.deleteUserObject = user;
        $("#user_Modal").modal();
    }
    deleteUser(){
       
        let user_id = this.deleteUserObject._id;
        this.service.deleteUser(user_id).subscribe((delRes)=>{
            this.deleteUserObject = '';
            this.delete_response=delRes.delRes;
            this.getAllUser(this.actRoute.snapshot.queryParams['pageno']);
            setTimeout(()=>{
                $("#user_delete").modal();
               },2000)
            
        },(error)=>{
            console.log('error',error)
        });
    }
    
}