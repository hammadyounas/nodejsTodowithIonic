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
  modify(item){

  }
  delete(item){
    
  }

}