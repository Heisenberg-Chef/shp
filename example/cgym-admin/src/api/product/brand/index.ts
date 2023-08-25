import request from "@/utils/request";
import {BrandFiled, BrandExistFiled} from "@/api/product/type";

enum API {
    BRAND_UTL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark',
    SaveBrand_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/save',
    UpdateBrand_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/update',
    DELETE_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/remove/',
}

export const reqBrandData = (page: number, limit: number) => request.get<any, BrandFiled>(API.BRAND_UTL + `/${page}/${limit}`)
export const operationData = (data: BrandExistFiled) => {
    if (data.id) {
        return request.put<any, any>(API.UpdateBrand_URL, data)
    } else {
        return request.post<any, any>(API.SaveBrand_URL, data)
    }
}
export const deleteBrand = (id: number) => request.delete<any, any>(API.DELETE_URL + id)

