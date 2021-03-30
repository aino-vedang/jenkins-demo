import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

    componentPortal;
    overlayRef;

  constructor(private overlay: Overlay) { }
  
  open(config: AppOverlayConfig, component: any) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    config['positionStrategy'] = positionStrategy;
    // Returns an OverlayRef which is a PortalHost
    this.overlayRef = this.overlay.create(config);

    // Create ComponentPortal that can be attached to a PortalHost
    this.componentPortal = new ComponentPortal(component);
   
    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(this.componentPortal);
    
  }

  /**
   * Detach the progress bar
   */
  detachProgressBar(){
    this.overlayRef.detach();
  }


}

export interface AppOverlayConfig extends OverlayConfig { }
