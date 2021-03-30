import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { ReviewImageComponent } from 'src/app/review/review-image/review-image.component';

export class ReviewActionDispatcher extends BaseActionDispatcher {

  reviewGrid: ReviewImageComponent;

  constructor(reviewGrid: ReviewImageComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.reviewGrid = reviewGrid;
  }

  addInPipeLine() {
   
  }


  /**
* Open view history dialogue box
*/
  viewImage(data) {
    
  }

}