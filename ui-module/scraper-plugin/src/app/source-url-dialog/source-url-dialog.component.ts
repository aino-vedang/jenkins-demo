import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SiteArea } from '../add-edit-script/add-edit-script.component';
import { ScraperService } from 'src/server-integration/Impl/ScraperService.js';
import { SiteSlim } from 'src/slim/SiteSlim';
import { AreaSlim } from 'src/slim/AreaSlim';
import { SuccessErrorDialogComponent } from '../success-error-dialog/success-error-dialog.component';

/**
 * @author : nandita@ainosoft.com
 */
@Component({
  selector: 'app-source-url-dialog',
  templateUrl: './source-url-dialog.component.html',
  styleUrls: ['./source-url-dialog.component.css']
})
export class SourceUrlDialogComponent implements OnInit {

  scraperService = new ScraperService();

  siteId: number;
  areaId: number;
  siteUrl: string = '';
  areaName: string = '';

  constructor(public dialogRef: MatDialogRef<SourceUrlDialogComponent>, @Inject(Router) private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: SiteArea) { }

  ngOnInit() {
  }

  siteAreaFormGroup = new FormGroup({
    siteUrl: new FormControl('', Validators.required),
    areaName: new FormControl('', Validators.required)
  });

  public closeDialog() {
    this.router.navigate(['/draftPublish/draft']);
  }

  /** On submit of form site name and area name, sets the values to form group. */
  public onSubmit(): void {

    if (this.siteAreaFormGroup.valid) {

      if (this.siteAreaFormGroup.value.siteUrl != null) {
        this.siteUrl = this.siteAreaFormGroup.value.siteUrl;
        this.areaName = this.siteAreaFormGroup.value.areaName;

        this.saveSiteAndArea(this.siteUrl);
      }
    }
  }

  /** After submit of source url dialog box, makes server call to save site url and area name to database.
   * @param siteUrl site url
   */
  public saveSiteAndArea(siteUrl: string): void {

    this.scraperService.checkSiteAlreadyExists(siteUrl).setServiceName('Scraper').post('/checkSiteAlreadyExists').then(
      result => {
        console.log(result);
        if (result === null) {
          this.saveSite(siteUrl);

        } else if (result.id != null) {
          this.siteId = result.id;

          this.checkAreaAlreadyExists(this.siteId, this.areaName);
        }
      },
      error => {
        console.log(error);
        this.openErrorDialog();
      }
    );
  }

  /**
  * Makes a server call to save the site url to the database.
  * @param siteUrl site url.
  */
  public saveSite(siteUrl: string): void {

    let siteSlim = new SiteSlim();
    siteSlim.setId = null;
    siteSlim.setProjectId = null;
    siteSlim.setUrl = siteUrl;

    this.scraperService.saveSite(siteSlim).setServiceName('Scraper').post('/saveSite').then(
      result => {
        this.siteId = result;

        if (this.siteId != null) {
          this.checkAreaAlreadyExists(this.siteId, this.areaName);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  /** Checks whether the area already exists under that particular site in the database.
   * @param siteId site id
   * @param areaName area name
   */
  public checkAreaAlreadyExists(siteId: number, areaName: string): void {

    this.scraperService.checkAreaAlreadyExists(siteId, areaName).setServiceName('Scraper').post('/checkAreaAlreadyExists').then(
      result => {

        if (result == null) {
          this.saveArea(this.siteId);
        } else if (result != null) {

          this.areaId = result.id;
          this.openAlreadyExistDialog();
          this.dialogRef.close({ data: { site: this.siteAreaFormGroup.value.siteUrl, siteId: this.siteId, area: this.siteAreaFormGroup.value.areaName, areaId: this.areaId } });
        }
      },
      error => {
        console.log(error);
        this.openErrorDialog();
      }
    );
  }


  /**
  * Makes server call to save the area to the database, using the corressponding site id.
  * @param siteId site id.
  */
  public saveArea(siteId: number): void {

    let areaSlim = new AreaSlim();
    areaSlim.setId = null;
    areaSlim.setAreaName = this.siteAreaFormGroup.value.areaName;
    areaSlim.setSiteId = siteId;

    this.scraperService.saveSite(areaSlim).setServiceName('Scraper').post('/saveArea').then(
      result => {

        if (result != null) {
          this.areaId = result;
          this.openSuccessDialog();
          this.dialogRef.close({ data: { site: this.siteAreaFormGroup.value.siteUrl, siteId: this.siteId, area: this.siteAreaFormGroup.value.areaName, areaId: this.areaId } });
        }
      },
      error => {
        console.log(error);
        this.openErrorDialog();
      }
    );
  }

  /** Opens success dialog box if site url and area are saved successfully to the database. */
  public openSuccessDialog(): void {

    this.dialog.open(SuccessErrorDialogComponent, {
      width: '400px',
      data: { name: 'success', Msg: 'Saved successfully !', icon: 'check_circle', iconColor: '#006400f5' }
    });
  }

  /** Opens error dialog box if, error occurs while savite site url and area to the database. */
  public openErrorDialog(): void {

    let errorDialogRef = this.dialog.open(SuccessErrorDialogComponent, {
      width: '400px',
      data: { name: 'error', Msg: 'Error !', icon: 'error', iconColor: 'red' }
    });

    errorDialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/draftPublish/draft']);
    });

  }

  /** Opens already Exist dialog box if site url and area are already saved in the database. */
  public openAlreadyExistDialog(): void {

    this.dialog.open(SuccessErrorDialogComponent, {
      width: '400px',
      data: { name: 'alreadyExist', Msg: 'Already Exist !', icon: 'check_circle', iconColor: '#006400f5' }
    });
  }

}
