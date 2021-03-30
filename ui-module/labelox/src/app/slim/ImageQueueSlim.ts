import { Injectable } from '@angular/core';

@Injectable({ 
    providedIn: 'root'
})
export class ImageQueueSlim{

    imageQueueId:number;
    imageName:string;
    base64String:any;
    imageId :String;
    creationTime :string;
    modificationTime:string;
    modifiedBy:string;
    assignedTo:string;
    status:string;
    note:string;
    versionId:number;


    get getImageName(): string{
        return this.imageName;
    }

    set setImageName(imageName:string){

        this.imageName = imageName;
    }

    get getImageQueueId(): number{
        return this.imageQueueId;
    }

    set setImageQueueId(value:number){

        this.imageQueueId = value;
    }


    get getBase64String():any{
        return this.base64String;
    }

    set setBase64String(base64String:any){
        this.base64String=base64String;
    }

    get getImageId():String{

        return this.imageId;
    }

    set setImageId(imageId:String){
       this.imageId=imageId;
    }

    get getCreationTime():string{
        return this.creationTime;
    }

    set setCreationTime(creationTime:string){
        this.creationTime=creationTime;
    }

    get getModificationTime():string{
        return this.modificationTime;
    }

    set setModificationTime(modificationTime:string){
        this.modificationTime=modificationTime;
    }

    get getModifiedBy():string{
        return this.modifiedBy;
    }

    set setModifiedBy(modifiedBy:string){
        this.modifiedBy=modifiedBy;
    }

    get getStatus():string{
        return this.status;
    }

    set setStatus(status:string){
        this.status=status;
    }
    get getNote():string{
        return this.note;
    }

    set setNote(note:string){
        this.note=note;
    }
    get getVersionId():number{
        return this.versionId;
    }

    set setAssignedTo(versionId:number){
        this.versionId=versionId;
    }
}

