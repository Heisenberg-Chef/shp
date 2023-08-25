function createUserList() {
    return [
        {
            userId: 1,
            username: 'hang',
            avatar: 'http://img.hangdan.top/admin/1.jpg',
            password: "123",
            desc: "平台管理员",
            roles: ["平台管理员"],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token'
        },
        {
            userId: 1,
            username: 'system',
            password: "123",
            avatar: 'http://img.hangdan.top/admin/2.jpg',
            desc: "系统管理员",
            roles: ["系统管理员"],
            buttons: ['cuser.detail', 'cuser.sign'],
            routes: ['home'],
            token: 'Admin Token'
        }
    ]
}

export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: ({body}) => {
            const {username, password} = body
            const checkUser = createUserList().find(item => {
                    return item.username === username && item.password === password
                }
            )
            if (!checkUser) {
                return {code: 201, data: {message: "账号或密码错误"}}
            }
            const {token} = checkUser
            return {code: 200, data: {token}}
        },
    },
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            const token = request.headers.token
            const checkUser = createUserList().find(item => {
                return item.token === token
            })
            if (!checkUser) {
                return {code: 201, data: {message: "获取用户信息失败"}}
            }
            return {code: 200, data: {checkUser}}
        },
    }
]