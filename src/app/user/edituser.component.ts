import { Component,OnInit } from '@angular/core';
import { TtsService} from './../services/ttsservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
declare var $:any;
@Component({
    selector:'user-edit',
    templateUrl:'./edituser.component.html'
})

export class Edituser{

    

    userImageProp:File;
    imageUploadError = Array();
    userDetail:any;
    imgBasepath:any = "http://localhost:3000/user";
    editedUserId:any
    updateResponse:any;
    formObj = new FormGroup({
        user_name: new FormControl('',[Validators.required,Validators.minLength(3)]),
        user_email: new FormControl('',[Validators.required,Validators.minLength(3)]),
        user_phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
        user_org: new FormControl('',[Validators.required,Validators.minLength(2)]),
        user_img: new FormControl(''),
        user_role: new FormControl('',[Validators.required]),
        userId: new FormControl('',[Validators.required,Validators.minLength(3)]),
        password: new FormControl('',[Validators.minLength(3)]),
        status: new FormControl('',[Validators.required]),
    })
    imageUrl:any;
    constructor(private service:TtsService,private route:Router,private activatedRoute:ActivatedRoute,private spinner: NgxSpinnerService){
    }
    ngOnInit(){

        this.activatedRoute.params.subscribe((paramsData)=>{
            this.getUserDetail(paramsData.userid)
        })
    }
    
    addImage(event){
        this.userImageProp = event.target.files[0];
    }
    
    

    getUserDetail(user_id){
        this.spinner.show();
        this.editedUserId = user_id;
        this.service.getSingelUser(user_id).subscribe((userDetail)=>{
            if(userDetail.body.status == 0){

            }
            if(userDetail.body.status == 1){
                this.userDetail= userDetail.body.user_res;
                
                if(this.userDetail.userimage)
                this.imageUrl = this.imgBasepath+"/"+this.userDetail.userimage;
                this.formObj = new FormGroup({
                    user_name: new FormControl(this.userDetail.name,[Validators.required,Validators.minLength(3)]),
                    user_email: new FormControl(this.userDetail.email,[Validators.required,Validators.minLength(3)]),
                    user_phone: new FormControl(this.userDetail.contact,[Validators.required,Validators.minLength(10)]),
                    user_org: new FormControl(this.userDetail.organisation,[Validators.required,Validators.minLength(2)]),
                    user_img: new FormControl(''),
                    user_role: new FormControl(this.userDetail.role,[Validators.required]),
                    userId: new FormControl(this.userDetail.userid,[Validators.required,Validators.minLength(3)]),
                    password: new FormControl('',[Validators.minLength(3)]),
                    status: new FormControl(this.userDetail.status,[Validators.required]),
                })
            }
            setTimeout(()=>{
                this.spinner.hide();
            },2000)
        },(error)=>{
            setTimeout(()=>{
                this.spinner.hide();
            },2000)
            console.log('error',error)
        })
    }

    submitUser(){
        this.spinner.show();
        if(this.userImageProp){
            let fileName = this.userImageProp.name;
            let fileType = fileName.substr(fileName.lastIndexOf('.')+1)
            let file_size = (this.userImageProp.size/(1024*1024));
            let all_image_type = Array('jpg','jpeg','gif','png');
            
            if(all_image_type.indexOf(fileType)<0){
                this.imageUploadError.push({type_error:'Only Image type file is allowed'});
                return false;
            }else if(file_size>2){
                this.imageUploadError.push({size_error:'File Size can not be greater than 2 MB'});
            return false;
            }
        }
        var formData = new FormData();
        formData.append('edited_userid',this.editedUserId);
        formData.append('name',this.formObj.value.user_name);
        formData.append('email',this.formObj.value.user_email);
        formData.append('contact',this.formObj.value.user_phone);
        formData.append('organisation',this.formObj.value.user_org);
        formData.append('role',this.formObj.value.user_role);
        if(this.userImageProp){
            formData.append('user_img',this.userImageProp,this.userImageProp.name);
        }
        formData.append('userId',this.formObj.value.userId);
        formData.append('password',this.formObj.value.password);
        formData.append('created_by',localStorage.getItem("id"));
        formData.append('status',this.formObj.value.status);

        this.service.updateUser(formData).subscribe((updRes)=>{
                if(updRes.body.status == 1){
                    this.updateResponse = `<span class="text-success">User updated Successfully</span>`;
                }else{
                    this.updateResponse = `<span class="text-success">Unable to update. Some problme ocurred</span>`;
                }
               
                
               
                setTimeout(()=>{
                    this.spinner.hide();
                },1000)
                setTimeout(()=>{
                    $("#edit_user").modal();
                },2000)
            
        },(error)=>{
            console.log('error',error)
        })
    }
}