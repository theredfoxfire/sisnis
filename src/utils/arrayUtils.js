export const getUserRole = (roleList, roleName) => {
    return roleList.find(item => item === roleName)
}