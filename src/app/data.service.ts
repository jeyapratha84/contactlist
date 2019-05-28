import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl:string = "http://localhost:3000";
  private addresslist:any =[];
  constructor(private httpClient : HttpClient) { }
  

  get_contacts(){
    return this.httpClient.get(this.baseUrl + '/contacts');
}

public httpget(params,get_clbk){
 
  this.httpClient.get(this.baseUrl+params.url,params.data)
  .subscribe(response=>{
     
    get_clbk(null,response)
  },
  err=>{
    get_clbk(err);
  })
}

public httppost(params,postclbk)
{
this.httpClient.post(this.baseUrl+params.url,params.data)
.subscribe(response=>{
  postclbk(null,response)  
},
err=>{
  postclbk(err);
}
)
}


public httpput(params,postclbk)
{
this.httpClient.put(this.baseUrl+params.url,params.data)
.subscribe(response=>{
  postclbk(null,response)  
},
err=>{
  postclbk(err);
}
)
}

public httpdelete(params,postclbk)
{
this.httpClient.put(this.baseUrl+params.url,params.data)
.subscribe(response=>{
  postclbk(null,response)  
},
err=>{
  postclbk(err);
}
)
}




}
