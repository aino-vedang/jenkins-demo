import { HttpServiceInvoker } from "@ainosoft/appops-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js";
export class ModelRepoService {
    saveModelDetails(modelName, labelList) {
        return new HttpServiceInvoker(modelName, labelList);
    }
}
//# sourceMappingURL=modelrepo.service.js.map