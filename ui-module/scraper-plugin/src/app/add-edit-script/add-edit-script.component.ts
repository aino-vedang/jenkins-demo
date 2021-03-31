import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ScriptService } from 'src/mock-data/script.service';
import { SourceUrlDialogComponent } from '../source-url-dialog/source-url-dialog.component';
import { ScraperService } from 'src/server-integration/Impl/ScraperService.js';
import { ScriptSlim } from '../../slim/ScriptSlim';
import { Router } from '@angular/router';

(window as any).global = window;

export interface SiteArea {
  site: string;
  siteId: number;
  area: string;
  areaId: number;
}

export interface SuccessErrorDialogData {
  name: string;
  Msg: string;
  icon: string;
  iconColor: string;
}

/**
 * @author : nandita@ainsoft.com
 */
@Component({
  selector: 'app-add-edit-script',
  templateUrl: './add-edit-script.component.html',
  styleUrls: ['./add-edit-script.component.css']
})
export class AddEditScriptComponent implements OnInit {

  scriptTemplatesList = new Array();
  siteUrl: string = '';
  areaName: string = '';

  siteId: number;
  areaId: number;

  validMsg: boolean = false;
  invalidMsg: boolean = false;

  enableSaveButton: boolean = true;

  scraperService = new ScraperService();

  constructor(@Inject(ScriptService) private scriptService: ScriptService, public dialog: MatDialog, @Inject(Router) private router: Router) { }

  ngOnInit() {
    this.getScriptTemplatesList();

    if (history.state.data != null) {
      this.populateScriptDataToForm(history.state.data);
    } else {
      this.openSourceUrlDialog();
    }
  }

  formDraft = new FormGroup({
    id: new FormControl(),
    areaId: new FormControl(),
    scriptName: new FormControl(),
    scriptBlob: new FormControl('', Validators.required)
  });

  /** Fetches all script templates list. */
  public getScriptTemplatesList(): void {
    this.scriptService.getScriptTemplatesList().toPromise().then(
      result => {
        this.scriptTemplatesList = result;
      }
    );
  }

  /** Opens dialog box for entering site url and area name. */
  public openSourceUrlDialog(): void {
    const dialogRef = this.dialog.open(SourceUrlDialogComponent, {
      disableClose: true,
      width: '550px',
      data: { site: this.siteUrl, area: this.areaName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.data != null) {
        this.siteUrl = result.data.site;
        this.areaName = result.data.area;
        this.areaId = result.data.areaId;
      }
    });
  }

  /** Formats the script written in the textarea. */
  public format(): void {
    try {
      var formatter = require('xml-formatter');
      var xml = this.formDraft.value.scriptBlob;

      var formattedXml = formatter(xml, {
        indentation: '      ',
        filter: (node) => node.type !== "Comment",
        collapseContent: false,
        lineSeparator: "\n"
      });

      this.formDraft.setValue({
        id: history.state.data.id,
        areaId: history.state.data.areaId,
        scriptName: history.state.data.scriptName,
        scriptBlob: formattedXml
      });

    } catch {

    }
  }

  /** Validates the script, whether the script is properly xml formatted. */
  public validateScript(): void {

    const xmlData = this.formDraft.value.scriptBlob;
    var parser = require('fast-xml-parser');

    if (parser.validate(xmlData) == true) {
      this.validMsg = true;
      this.invalidMsg = false;
      this.enableSaveButton = false;
    } else {
      this.validMsg = false;
      this.invalidMsg = true;
      this.enableSaveButton = true;
    }

  }

  /** closes the Validator info message. */
  public closeValidatorMsg(): void {
    this.validMsg = false;
    this.invalidMsg = false;
  }

  /** After validating the script, makes the server call to save the script to the database.*/
  public saveScript(): void {
    let scriptSlim = new ScriptSlim();
    scriptSlim.setScriptName = this.siteUrl + '/' + this.areaName;
    scriptSlim.setScriptBlob = this.formDraft.value.scriptBlob;
    scriptSlim.setAreaId = this.areaId;
    scriptSlim.setId = null;
    scriptSlim.setInUse = null;

    console.log(this.siteUrl, " ", this.areaName, " ", scriptSlim)
    this.scraperService.saveScript(scriptSlim).setServiceName('Scraper').post('/saveScript').then(
      result => {
        if (result != null) {
          this.router.navigate(['/draftPublish/draft']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /** On click of cancel button of dialog box of adding a new script, navigates to draft grid. */
  public cancelAddOrEditScript(): void {
    this.router.navigate(['/draftPublish/draft']);
  }

  /**
   * Populates the script data of the selected script from the draft grid.
   * @param scriptObj script object
   */
  public populateScriptDataToForm(scriptObj): void {

    this.formDraft.setValue({
      id: scriptObj.id,
      areaId: scriptObj.areaId,
      scriptName: scriptObj.scriptName,
      scriptBlob: scriptObj.scriptBlob
    });
  }

  /** Makes call for saving a new script or updating an existing one accordingly on submit/save script button. */
  public onSaveScript(): void {

    console.log('on save');
    if (this.validMsg === true) {


      if (this.formDraft.get('id').value != null) {
        this.updateScript();
      } else {
        this.saveScript();
      }
    }
  }

  /** Updates an existing script to the database. */
  public updateScript(): void {

    let scriptSlim = new ScriptSlim();

    scriptSlim.setId = this.formDraft.get('id').value;
    scriptSlim.setAreaId = this.formDraft.get('areaId').value;
    scriptSlim.setScriptName = this.formDraft.get('scriptName').value;
    scriptSlim.setScriptBlob = this.formDraft.value.scriptBlob;
    scriptSlim.setInUse = history.state.data.inUse;

    this.scraperService.updateScript(scriptSlim).setServiceName('Scraper').post('/updateScript').then(
      result => {
        console.log(result);
        if (result != null) {
          this.router.navigate(['/draftPublish/draft']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
