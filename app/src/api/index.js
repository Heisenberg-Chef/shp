// 统一管理API
import requests from "./request";

// 复用接口 
// getBaseCategoryList GET 无参数
export const reqCategoryList = () => {
    // 发请求
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}

