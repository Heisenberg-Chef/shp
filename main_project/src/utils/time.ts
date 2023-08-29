// 封装时间函数，根据登录时间进行提示信息显示
export const getTime = () => {
    let hours = new Date().getHours(); // 使用js的内置对象Date获取时间
    return hours <= 8 ? "早上好" : hours <= 11 ? "上午好" : hours <= 14 ? "中午好" : hours <= 18 ? "下午好" : "晚上好"
}