import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { PipeLineComponent } from 'src/app/review/pipeline/pipeline.component';
import { RejectedComponent } from 'src/app/review/rejected/rejected.component';

export class RejectedActionDispatcher extends BaseActionDispatcher {

  rejectedGrid: RejectedComponent;

  constructor(rejectedGrid: RejectedComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.rejectedGrid = rejectedGrid;
  }

  addInPipeLine() {
    
  }


  /**
* Open view history dialogue box
*/
  viewImage(data) {
   
  }

}