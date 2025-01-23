interface serviceResponse {
    statusCode: number,
    isError: boolean,
    message: string,
    data?: any,
    cookie_data?: any
}

interface repoResponse {
    statusCode: number,
    isError: boolean,
    message: string,
    data?: any
}

export {
    serviceResponse,
    repoResponse,
}