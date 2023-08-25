import request from "@/utils/request";

enum API {
    AllRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/role/',
    DeleteRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/role/remove/',
    AddRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/role/save',
    UpdateRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/role/update',
    AuthList_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission/toAssign/',
    RoleAuth_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/permission/doAssign',
}

export const reqRoleList = (page: number, limit: number, roleName: string) => request.get<any, any>(API.AllRole_URL + `${page}/${limit}/?roleName=${roleName}`)
export const reqDeleteRole = (userId: any) => request.delete(API.DeleteRole_URL + userId)
// 通过id判断添加或更新
export const reqAddOrUpdateRole = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UpdateRole_URL, data)
    } else {
        return request.post<any, any>(API.AddRole_URL, data)
    }
}
export const reqAuthList = (roleId: any) => request.get(API.AuthList_URL + roleId)
export const reqRoleAuthList = (roleId: any, permissionId: any,) => request.post(API.RoleAuth_URL + `?roleId=${roleId}&permissionId=${permissionId}`)