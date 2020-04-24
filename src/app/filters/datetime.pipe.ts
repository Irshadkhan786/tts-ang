import { Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';
//import * as moment from 'moment'
@Pipe({
    name:'datetimefilter'
})
export class Datetimefilter implements PipeTransform{
    transform(value:any,agrs:any){
        
        if(!value){
            return null;
        }
        var currdate:any = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate:any = new Date();
        const secondDate:any = new Date(value);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log('diff',diffDays,'org date '+value)
        if(diffDays == 0){
            return "Today at "+dateformat(value, "h:MM TT");
        }else if(diffDays == 1){
            return "Yesterday at "+dateformat(value, "h:MM TT");
        }else{
            return " At "+dateformat(value, "dd mmmm yyyy h:MM TT");
        }
        //return dateformat(value, "h:MM TT");
    }
}