// const cors = require('cors');
import cors from 'cors';

const configureCors = (app) => {
    return cors({
        origin: (origin, callback)=> {
            const allowedOrigins = [
                'http://localhost:3000',
                'http://yourcustomdomain.com'
            ]
            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true);
            } else {
                callback(new Error('Not allowed by cors'))
            }
        },
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders: ['X-Total-Count', 'Content-Range'],
        credentials: true, // enable support for cookies,
        preflightContinue: false, // Passs the cors preflight response to the next handler.
        maxAge: 600,
        optionsSuccessStatus: 204
    })
}

// module.exports = {configureCors};
export { configureCors };