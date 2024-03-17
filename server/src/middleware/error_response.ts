export const errorName: { [key: string]: string } = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOTFOUND: 'NOTFOUND'
}

export const errorType: { [key: string]: { message: string; statusCode: number } } = {
    UNAUTHORIZED: {
        message: 'Authentication is needed',
        statusCode: 401
    },
    NOTFOUND: {
        message: 'Data not found',
        statusCode: 404
    }
}