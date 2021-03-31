export interface ScraperService {

    getScriptInDraftByPage(startIndex : number, pageSize: number): Promise<any>;

    getScriptInPublishedByPage(startIndex : number, pageSize: number): Promise<any>;

    checkSiteAlreadyExists(siteName: string): Promise<any>;

    saveSite(site: string): Promise<any>;

    checkAreaAlreadyExists(siteId: number, areaName: string): Promise<any>;

    saveArea(area: string): Promise<any>;

    saveScript(scriptSlim): Promise<any>;

    updateScript(scriptSlim): Promise<any>;
}