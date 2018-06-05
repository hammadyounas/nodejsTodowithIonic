import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Headers ,HttpModule } from "@angular/http";
// import {map} from 'rxjs/Operator'
// import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  values =  [];
  text;
  modifyText;
  modifyvalue:boolean = false;
  constructor(public navCtrl: NavController, private http: Http ) {
    this.getData()
  }
  getData(){
    const headers = new Headers({ "Content-Type": "application/json" });
    this.http.get('http://localhost:3000/')
    .subscribe((data:any) =>{
      this.values  = JSON.parse(data._body);
      console.log("this.values",this.values);
    })

  }
  add(){
    let obj = {
      'add':this.text
    }
    this.http.post('http://localhost:3000/add',obj).subscribe((res:any)=>{
      console.log(JSON.parse(res._body));
      this.values = JSON.parse(res._body);
      this.text = "";
    })
  }
  modify(item){
    this.modifyvalue = true;
    this.modifyText = item;
    console.log(item);
  }
  delete(item){
    console.log(item)
    let deleteItem = {
      'id':item.id,
      'edit':item.value
    };
    // const headers = new Headers({ "Content-Type": "application/json" });
    this.http.delete('http://localhost:3000/delete/'+item.id).subscribe((res:any)=>{
      console.log(JSON.parse(res._body));
      this.values = JSON.parse(res._body);
    })
  }
  update(){
    this.http.post('http://localhost:3000/edit',this.modifyText).subscribe((res:any)=>{
      console.log(JSON.parse(res._body));
      this.values = JSON.parse(res._body);
      this.modifyvalue = false;
    })
    console.log("modifyText",this.modifyText);
  }
  cancel(){
    this.modifyvalue = false;
  }

}