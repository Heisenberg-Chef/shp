import request from "@/utils/request";

enum API {
    MenuList_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission',
    AddMenu_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission/save',
    UpdateMenu_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission/update',
    DeleteMenu_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission/remove/',
}

export const reqMenuList = () => request.get<any, any>(API.MenuList_URL)

export const reqAddorUpdateMenu = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UpdateMenu_URL, data)
    } else {
        return request.post<any, any>(API.AddMenu_URL, data)
    }
}

export const reqDeleteMenu = (id: any) => request.delete<any, any>(API.DeleteMenu_URL + id)