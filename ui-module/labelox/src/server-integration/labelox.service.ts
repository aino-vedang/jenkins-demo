export interface LabeloxService {
   
    getAllImages(): Promise<any>;
    
    viewImageDetails(id):Promise<any>;

    saveImage(fileList):Promise<any>;

    getImagesByPaging(startIndex,pageSize):Promise<any>;

    displayImage(image_id):Promise<any>;

}