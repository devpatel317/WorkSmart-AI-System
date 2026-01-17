export const getUser = () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
}

export const setUser = (res) => {
    localStorage.setItem("user", JSON.stringify(res.user))
    localStorage.setItem("accessToken",res.accessToken)
}

export const logout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
}