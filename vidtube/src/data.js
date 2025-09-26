export const API_KEY='AIzaSyDmc4YfrEAwxWnmf-sZEBkwmj5UGwWCeNs';

export const value_converter=(val)=>{
    if(val>=1000000){
        return Math.floor(val/100000)+"M";
    }else if(val>=1000){
            return Math.floor(val/1000)+"K";
    }else{
        return val;
    }

}