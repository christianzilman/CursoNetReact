export interface IUser
{
    userName: string
    email: string
    token: string
    avatar?: string
    id: string
    isOnline?: boolean
    primaryAppColor: string
    secondaryAppColor: string
}


export interface IUserFormValues
{
    userName: string
    email: string
    password: string
    avatar?: string
}

export interface IUserAppColors
{
    primaryAppColor: string 
    secondaryAppColor: string
}