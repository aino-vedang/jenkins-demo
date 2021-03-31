import { HttpServiceInvoker } from "@ainosoft/appops-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js";
export class ScraperService {
    getScriptInDraftByPage(startIndex, pageSize) {
        return new HttpServiceInvoker(startIndex, pageSize);
    }
    getScriptInPublishedByPage(startIndex, pageSize) {
        return new HttpServiceInvoker(startIndex, pageSize);
    }
    checkSiteAlreadyExists(siteName) {
        return new HttpServiceInvoker(siteName);
    }
    saveSite(site) {
        return new HttpServiceInvoker(site);
    }
    checkAreaAlreadyExists(siteId, areaName) {
        return new HttpServiceInvoker(siteId, areaName);
    }
    saveArea(area) {
        return new HttpServiceInvoker(area);
    }
    saveScript(scriptSlim) {
        return new HttpServiceInvoker(scriptSlim);
    }
    updateScript(scriptSlim) {
        return new HttpServiceInvoker(scriptSlim);
    }
}
//# sourceMappingURL=ScraperService.js.map