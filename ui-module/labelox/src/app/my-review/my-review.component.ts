import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.css']
})
export class MyReviewComponent implements OnInit {

  isPipeLine:Boolean=true;
  isAssigned:Boolean=false;
  isApproved:Boolean=false;
  isRejected:Boolean=false;
  isReview:Boolean=false;

  constructor(){}

  ngOnInit(): void {}

  getNextBatch(event){
    console.log(event);
    if(event === 0){
      this.isPipeLine=false;
      this.isAssigned=false;
      this.isApproved=false;
      this.isRejected=false;
      this.isReview=true;
    }
    if(event === 1){
      this.isPipeLine=false;
      this.isAssigned=false;
      this.isApproved=true;
      this.isRejected=false;
      this.isReview=false;
    }
    if(event === 2){
      this.isPipeLine=false;
      this.isAssigned=false;
      this.isApproved=false;
      this.isRejected=true;
      this.isReview=false;
    }
    if(event === 3){
      this.isPipeLine=true;
      this.isAssigned=true;
      this.isApproved=false;
      this.isRejected=false;
      this.isReview=false;
    }
  }

}
