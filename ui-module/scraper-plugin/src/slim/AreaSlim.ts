export class AreaSlim {
    
    private id: number;
    private areaName: String;
    private siteId: number;

    public get getId(): number {
        return this.id;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public get getAreaName(): String {
        return this.areaName;
    }

    public set setAreaName(areaName: String) {
        this.areaName = areaName;
    }

    public get getSiteId(): number {
        return this.siteId;
    }

    public set setSiteId(siteId: number) {
        this.siteId = siteId;
    }

    
    
}