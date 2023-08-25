import request from "@/utils/request";

enum API {
    // 用户列表
    ALLUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/',
    // 添加用户
    ADDUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/save/',
    // 更新用户
    UPDATEUSER_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/update/',
    // 角色列表
    AllRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/toAssign/',
    // 更新角色
    UpdateRole_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/doAssignRole',
    // 删除一个用户
    DeleteOneUser_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/remove/',
    // 删除批量用户
    DeleteManyUser_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/user/batchRemove',
}

export const reqUser = (page: number, limit: number, username: string) => request.get<any, any>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
export const reqAddOrUpdateUser = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}
export const reqRoleList = (userId) => request.get<any, any>(API.AllRole_URL + userId)
export const reqUpdateRole = (data) => request.post<any, any>(API.UpdateRole_URL, data)
export const reqDeleteOneUser = (userId) => request.delete<any, any>(API.DeleteOneUser_URL + userId)
export const reqDeleteManyUser = (idList) => request.delete<any, any>(API.DeleteManyUser_URL, {data: idList})

