export const SET_TOKEN = (name: string, token: string) => {
    localStorage.setItem('Token', token)
}

export const GET_TOKEN = (name: string) => {
    return localStorage.getItem(name)
}

export const CLEAR_TOKEN = (name: string) => {
    return localStorage.removeItem(name)
}