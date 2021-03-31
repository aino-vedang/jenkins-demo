export class ScriptSlim {
    private id: number;
    private scriptName: String;
    private inUse: Boolean;
    private scriptBlob: String;
    private areaId: number;
    
    constructor(id?: number, name?: String, url?: String, inUse?: Boolean,
        scriptBlob?: String,
        createdOn?: String,
        modifiedOn?: String,
        areaId?: number ) {

        this.id = id;
        this.scriptName = name;
        this.inUse = inUse;
        this.scriptBlob = scriptBlob;
        this.areaId = areaId;
    }

    public get getId(): number {
        return this.id;
    }
    public set setId(value: number) {
        this.id = value;
    }
    public get getScriptName(): String {
        return this.scriptName;
    }
    public set setScriptName(value: String) {
        this.scriptName = value;
    }
    public get getInUse(): Boolean {
        return this.inUse;
    }
    public set setInUse(value: Boolean) {
        this.inUse = value;
    }
    public get getScriptBlob(): String {
        return this.scriptBlob;
    }
    public set setScriptBlob(value: String) {
        this.scriptBlob = value;
    }
    public get getAreaId(): number {
        return this.areaId;
    }
    public set setAreaId(value: number) {
        this.areaId = value;
    }
}