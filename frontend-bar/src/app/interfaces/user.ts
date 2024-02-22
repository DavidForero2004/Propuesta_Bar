export interface UserLogin {
    email: string,
    password: string
}

export interface GetUser {
    name: string,
    email: string,
    status: string,
    rol: string
}

export interface UserResponse {
    result: {
        users: GetUser[];
    }
}