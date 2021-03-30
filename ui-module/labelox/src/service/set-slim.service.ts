import { Injectable } from '@angular/core';
import { ImageQueueSlim } from 'src/app/slim/ImageQueueSlim';

@Injectable({
  providedIn: 'root'
})
export class SetSlimService {

  constructor(private imgSlim: ImageQueueSlim) { }
  

  /**
   * Set value to slim.
   * @param appInfo Information Slim.
   */
  setToSlim(appInfo) {
    this.imgSlim.setImageId = appInfo['imageId'];
    this.imgSlim.setImageQueueId = appInfo['imageQueueId'];
   // console.log(imgSlim)
  }

}
