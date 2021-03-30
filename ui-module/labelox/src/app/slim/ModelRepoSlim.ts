import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class ModelRepoSlim{
    id:number;
    modelName:String;

    get getId(): number{
        return this.id;
    }

    set setId(id:number){
        this.id = id;
    }


    get getModelName(): String{
        return this.modelName;
    }

    set setModelName(modelName:String){
        this.modelName = modelName;
    }

}