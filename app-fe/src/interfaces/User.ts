export interface IUser {
    id?:number,
    fullname?: string,
    username?: string,
    email?: string,
    role?: string
}

export interface IUserLogin {
    email: string,
    password: string
}