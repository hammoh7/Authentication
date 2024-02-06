/*
 * An array of routes that are accessible publicly
 * These routes do not require authentication
 * @type {string[]} 
*/
export const publicRoutes = [
    "/",
    "/confirm-verification"
];

/*
 * An array of routes that are used for authentication
 * These routes redirects logged in users to /settings
 * @type {string[]} 
*/
export const authRoutes = [
    '/Login',
    '/Register',
    '/error',
    '/reset',
    '/reset-password'
];

/*
 * The prefix for API authentication reoutes 
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string} 
*/
export const apiAuthPrefix = "/api/auth";

/*
 * The default redirect path after logging in
 * @type {string} 
*/
export const Default_Login_Redirect = "/server"