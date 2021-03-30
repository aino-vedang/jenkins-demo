import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { PipeLineComponent } from 'src/app/review/pipeline/pipeline.component';

export class PipeLineActionDispatcher extends BaseActionDispatcher {

  pipeLineGrid: PipeLineComponent;

  constructor(pipeLineGrid: PipeLineComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.pipeLineGrid = pipeLineGrid;
  }

  addInPipeLine() {
    this.pipeLineGrid.navigateToAddImage();
  }


  /**
* Open view history dialogue box
*/
  viewImage(data) {
    this.pipeLineGrid.viewImage(data);
  }

  /**
   * Get selected Row.
   */
  onRowClick(appInfo: {}) {
    this.pipeLineGrid.labelImage(appInfo);
  }


}