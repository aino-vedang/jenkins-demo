import { HttpServiceInvoker } from "@ainosoft/appops-core-components/components/appops-common/fetch-br/dist/http-service-invoker.js";
export class LabeloxService {
    getAllImages() {
        return new HttpServiceInvoker();
    }
    viewImageDetails(id) {
        return new HttpServiceInvoker(id);
    }
    saveImage(fileList) {
        return new HttpServiceInvoker(fileList);
    }
    getImagesByPaging(startIndex, pageSize) {
        return new HttpServiceInvoker(startIndex, pageSize);
    }
    displayImage(image_id) {
        return new HttpServiceInvoker(image_id);
    }
}
//# sourceMappingURL=labelox.service.js.map