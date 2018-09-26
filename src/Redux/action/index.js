export const SAVE_USER_INFO = 'SAVE_USER_INFO'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const saveUser = (userEmail,userPassword) => ({
    type: SAVE_USER_INFO,
    userEmail,
    userPassword
})

export const saveaccessToken = ( accessToken ) => ({
    type: ACCESS_TOKEN,
    accessToken
})