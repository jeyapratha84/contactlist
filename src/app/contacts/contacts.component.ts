import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private contactlist: any = [];
  private addresslist: any = [];
  private countryname: string;
  

  contactinfo = {
    "id": "",
    "first_name": "",
    "last_name": "",
    "avatar": ""
  };

  addressinfo = {
    "id": "",
    "street1": "",
    "street2": "",
    "town": "",
    "country": "",
    "contactId": ""
  };

  private clicked: boolean = false;

  private contacts = [];
  private address = [];

  cdetails={
    "id":"",
    "first_name":"",
    "last_name": "",
    "avatar": ""
  };
  constructor(private dataService: DataService) {        
    this.clicked = false;
  }

  ngOnInit() {
  }

  get_contacts(id) {
    this.clicked = false;
    console.log(id)
    var self = this;
    var params;
    if (id == '' && id == null) {
      params = {
        url: "/contacts"
      }
    } else {
      params = {
        url: "/contacts/" + id
      }
    }
    this.dataService.httpget(params, function (err, response) {
      if (!err) {
        self.contacts = []
        if (Array.isArray(response))
          self.contacts = response;
        else
          self.contacts.push(response);
        console.log()
      } else {
        console.log(err);
      }
    })
  }

  add_contacts() {
    this.clicked = true;
  }

  save_contacts() {
    var self = this;
    var params;

    params = {
      url: "/contacts",
      data: self.contactinfo
    }

    this.dataService.httppost(params, function (err, response) {
      if (!err) {
        self.contacts = []
        if (Array.isArray(response))
          self.contacts = response;
        else
          self.contacts.push(response);
        console.log()
      } else {
        console.log(err);
      }
    })

  }

  save_address() {

    var self = this;
    var params;

    params = {
      url: "/addresses",
      data: self.addressinfo
    }
    console.log(self.addressinfo);

    this.dataService.httppost(params, function (err, response) {
      if (!err) {
        self.address = []
        if (Array.isArray(response))
          self.address = response;
        else
          self.address.push(response);
        console.log()
        alert("new address created successfully");
      } else {
        console.log(err);
      }
    })

  }

  get_address(id,str1,str2,str3) {
    var self = this;
    this.cdetails.first_name=str1;
    this.cdetails.last_name=str2;
    this.cdetails.avatar=str3;
    this.cdetails.id=id;
    var params = {
      url: "/addresses",
      data: {
        params: {
          contactId: id
        }
      }
    }
    self.dataService.httpget(params, function (err, addrresponse) {
      if (!err) {
        self.addresslist = []


        var params = {
          url: "/countries",
          data: {
            params: {
              "iso2": addrresponse[0].country
            }
          }
        }
        self.dataService.httpget(params, function (err, response) {
          if (!err) {
            console.log(response)
            if (Array.isArray(addrresponse)) {
              self.addresslist = addrresponse;
              self.addresslist[0].country = response[0].name;
            }
            else {
              self.addresslist.push(addrresponse);
              self.addresslist[0].country = response[0].name;

            }
            console.log(self.addresslist)


          } else {
            console.log(err);
          }

        })



      } else {
        console.log(err);
      }
    })
  }


  update_address(id)
    {
  var self=this
  var params={
    url:"/addresses/" +id,
    data:self.addresslist    
  }
console.log("add",self.addresslist);
  this.dataService.httpput(params,function(err,response){
    if(!err){
      console.log("res",Object.values(response)[0]);
      self.address = []
    if(Array.isArray(response))
      self.address =Object.values(response)[0];
      else
      self.address.push(Object.values(response)[0]);
      console.log()
    }else{
      console.log(err);
    }
  })

  }


  delete_address(id)
  {
  var self=this
  var params={
    url:"/addresses/" +id,
    data:self.addresslist    
  }
  console.log("add",self.addresslist);
  this.dataService.httpdelete(params,function(err,response){
    if(!err){
      self.address = []    
    }else{
      console.log(err);
    }
  })

}




}
