import rateLimit from 'express-rate-limit';

const rateLimitMiddleware = (maxRequests, timeWindow) => {
    return rateLimit({
        windowMs: timeWindow * 60 * 1000, // time window in milliseconds
        max: maxRequests, // maximum number of requests
        message: 'Too many requests, please try again later.',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
}

export default rateLimitMiddleware;