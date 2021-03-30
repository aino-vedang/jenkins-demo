import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { ApprovedComponent } from 'src/app/review/approved/approved.component';

export class ApprovedActionDispatcher extends BaseActionDispatcher {

  approvedGrid: ApprovedComponent;

  constructor(approvedGrid: ApprovedComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.approvedGrid = approvedGrid;
  }

  addInPipeLine() {
   
  }


  /**
* Open view history dialogue box
*/
  viewImage(data) {
    
  }

}