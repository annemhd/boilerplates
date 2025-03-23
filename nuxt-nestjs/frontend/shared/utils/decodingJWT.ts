import { Buffer } from 'buffer';

export default function decodingJWT(token: any) {
    if (token) {
            const base64String = token.split('.')[1]
            const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'))
            return decodedValue
    }
}