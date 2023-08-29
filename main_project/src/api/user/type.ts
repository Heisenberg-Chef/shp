/**
 * 登录接口需要的参数的ts类型
 */
export interface loginForm {
    username: string,
    password: string
}


/**
 * 登录接口返回的数据的ts类型 
 * { code: 200, data: { token } }
 */
// ？表示可以写代该对象，也可以不携带
interface dataType {
    token?: string,
    message?: string
}

export interface loginResponseData {
    code: number,
    data: dataType
}


/**
 * 返回用户信息的数据的ts类型 
 * { code: 200, data: { checkUser } }
 */
interface userType {
    checkUser: {
        userId: number,
        avatar: string,
        username: string,
        password: string,
        desc: string,
        roles: string[],
        buttons: string[],
        routes: string[],
        token: string,
    }
}

export interface userInfoResponseData {
    code: number,
    data: userType
}