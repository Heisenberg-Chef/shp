import request from "@/utils/request";

enum API {
    CategoryOne_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory1',
    CategoryTwo_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory2/',
    CategoryThree_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory3/',
    Attribute_Url = 'http://114.115.179.162:8022/prod-api/admin/product/attrInfoList/',
    AddAttr_Url = 'http://114.115.179.162:8022/prod-api/admin/product/saveAttrInfo/',
    DeleteAttr_url = 'http://114.115.179.162:8022/prod-api/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get(API.CategoryOne_Url)
export const reqC2 = (category1Id: any) => request.get(API.CategoryTwo_Url + category1Id)
export const reqC3 = (category2Id: any) => request.get(API.CategoryThree_Url + category2Id)
export const reqAttr = (category1Id: any, category2Id: any, category3Id: any) => request.get(API.Attribute_Url + `${category1Id}/${category2Id}/${category3Id}`)
export const reqAddAttr = (data: any) => request.post(API.AddAttr_Url, data)
export const reqDeleteAttr = (attrId: any) => request.delete(API.DeleteAttr_url + attrId)