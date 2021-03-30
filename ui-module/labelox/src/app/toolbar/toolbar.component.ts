import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  selected;

  hideAndShow:Boolean=false;

  //Option For newsPaper
  options = [

    { name: "Update Labels" },
    { name: "Reprocess Articles" },
    { name: "Discard All Labels" }
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.displayContentInHeader()
    //Front and back button changes handle
    window.onhashchange=()=>{ 
      this.displayContentInHeader()
    };

    //Hide and show model repo name
    this.modelRepoName()
  }

  /**
   * Hide and show the element depending on the route.
   */
  displayContentInHeader():void{
    let drawLabel=document.querySelector(".drawLabel") as HTMLButtonElement;
    let selectLabel=document.querySelector(".selectLabel") as HTMLButtonElement;
    if(this.router.url === "/" ){
     drawLabel.style.display="none";
     selectLabel.style.display="none" 
    }
    if(this.router.url.includes('labelit')){
      drawLabel.style.display="none";  
      selectLabel.style.display="none" 
    }
  }

 

  /**
   * Hide and show model name
   */
  modelRepoName(){
    this.router.events.subscribe((val)=>{

      if(val instanceof NavigationEnd){
        console.log(val)
        if(val.url == "/review" || val.url == "/labelit" || val.url == "/model-setting"){
          this.hideAndShow=true;
        }else{
          this.hideAndShow=false;
        }
      }
    });
  }

}
