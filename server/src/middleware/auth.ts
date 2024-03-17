
import jwt from 'jsonwebtoken';
import {errorName} from './error_response'

export const tokenValidation = (token: string, role: string): string => {
    const tokenValue = token.split(' ')[1]
    let value: string = '';
    jwt.verify(tokenValue, 'secret', (err, decoded) =>{
        if (err) {
            throw new Error('unauthorized')
        } else {
            const decodedToken: any = decoded;
                if (role == decodedToken.role) {                
                    if (Date.now() >= decodedToken.exp * 1000) {
                        throw new Error(errorName.UNAUTHORIZED)                          
                    } else {
                        value = role
                }
            } else {
                throw new Error(errorName.UNAUTHORIZED)                          
            }
        
        }
    })

    return value
}

