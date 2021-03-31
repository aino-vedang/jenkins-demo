export class SiteSlim {
    
    private id: number;
    private url: String;
    private projectId: String;

    public get getId(): number {
        return this.id;
    }

    public set setId(id: number) {
        this.id = id;
    }

    public get getUrl(): String {
        return this.url;
    }

    public set setUrl(url: String) {
        this.url = url;
    }

    public get getProjectId(): String {
        return this.projectId;
    }

    public set setProjectId(projectId: String) {
        this.projectId = projectId;
    }


    
}