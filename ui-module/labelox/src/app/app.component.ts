import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  hideAndShow:Boolean;

  constructor(private router:Router){

  }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        if(val.url == "/"){
          this.hideAndShow=true;
        }else{
          this.hideAndShow=false;
        }
      }
    });
    //  this.router.navigate(['.']);
  }
  
  title = 'labelox';
}
