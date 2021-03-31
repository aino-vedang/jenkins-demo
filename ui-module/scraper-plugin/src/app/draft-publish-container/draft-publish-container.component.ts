import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @author : nandita@ainosoft.com
 */
@Component({
  selector: 'app-draft-publish-container',
  templateUrl: './draft-publish-container.component.html',
  styleUrls: ['./draft-publish-container.component.css']
})
export class DraftPublishContainerComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      { label: 'In Draft', link: './draft', index: 0 },
      { label: 'Publish', link: './publish', index: 1 }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
