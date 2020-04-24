import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { TtsService } from './../services/ttsservice.service';
declare var $:any;
@Component({
    selector:'user',
    templateUrl:'./user.component.html'
})
export class User{

    createResponse:boolean = false;
    createResponseText:String = '';
    userImageProp:File;
    imageUploadError = Array();
    constructor(private ttsservice:TtsService,private router:Router){

    }

    formObj = new FormGroup({
        user_name: new FormControl('',[Validators.required,Validators.minLength(3)]),
        user_email: new FormControl('',[Validators.required,Validators.minLength(3)]),
        user_phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
        user_org: new FormControl('',[Validators.required,Validators.minLength(2)]),
        user_img: new FormControl('',[Validators.required]),
        user_role: new FormControl('',[Validators.required]),
        userId: new FormControl('',[Validators.required,Validators.minLength(3)]),
        password: new FormControl('',[Validators.required,Validators.minLength(3)]),
        status: new FormControl('',[Validators.required]),
    })
    addImage(event){
        this.userImageProp = event.target.files[0];
    }
    createUser(){
        
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
        
        var user_name = this.formObj.value.user_name;
        var formData = new FormData();
        formData.append('name',this.formObj.value.user_name);
        formData.append('email',this.formObj.value.user_email);
        formData.append('contact',this.formObj.value.user_phone);
        formData.append('organisation',this.formObj.value.user_org);
        formData.append('role',this.formObj.value.user_role);
        formData.append('user_img',this.userImageProp,this.userImageProp.name);
        formData.append('userId',this.formObj.value.userId);
        formData.append('password',this.formObj.value.password);
        formData.append('created_by',localStorage.getItem("id"));
        formData.append('status',this.formObj.value.status);

        this.ttsservice.createUser(formData).subscribe((ins_res)=>{
            if(ins_res.body.status == "1"){
                this.createResponse = true;
                this.createResponseText = ins_res.body.res;
                
                $("#user_Modal").modal();
                setTimeout(()=>{
                    $('#user_Modal').modal('hide');
                    this.router.navigate(['/userlist']);
                },2000)
                
            }else{
                this.createResponse = false;
                this.createResponseText = ins_res.body.res;    
                $("#user_Modal").modal();            
            }
           
        },(err)=>{
            this.createResponse = false;
            $("#user_Modal").modal();
            console.log('err')
        });
    }
}