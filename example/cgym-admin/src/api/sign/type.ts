// 登录携带参数类型
export interface loginForm {
    username: string,
    password: string
}

export interface ResponseData {
    code: number,
    message: string,
    od: boolean
}


// 登录返回类型
export interface loginResponseData extends ResponseData {
    data: string
}

export interface userInfo extends ResponseData {
    data: {
        name: string,
        avatar: string,
        roles: string[],
        buttons: string[],
        routes: string[],
    }
}
