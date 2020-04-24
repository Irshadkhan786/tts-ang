import  { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { TtsService } from './../services/ttsservice.service';
@Component({
    'selector':'file-upload',
    'templateUrl':'./fileupload.component.html'
})

export class Fileuploads{

    imageObject:any;
    formObj= new FormGroup({
        profile_pic: new FormControl('',Validators.required)
    })    

    constructor(private ttsservice:TtsService){

    }

    getImageData(event){
        console.log(event.target.files);
        this.imageObject = event.target.files[0];
    }
    submitForm(){
       
        var input = new FormData();
        input.append('sampleFile',this.imageObject,this.imageObject.name);
        input.append('name','john');
        input.append('mobile','8585858585');
        this.ttsservice.testUpload(input).subscribe((data)=>{
            console.log(data)
        },(error)=>{
            console.log(error)
        })
    }
}