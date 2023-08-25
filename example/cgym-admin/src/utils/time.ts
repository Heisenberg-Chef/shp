export const getTime = () => {
  const hour = new Date().getHours()
  if (hour <= 9) {
    return "早上"
  } else if (hour > 9 && hour <= 11) {
    return "上午"
  } else if (hour > 11 && hour < 15) {
    return "中午"
  } else if (hour >= 15 && hour <= 19) {
    return "下午"
  } else {
    return "晚上"
  }
}