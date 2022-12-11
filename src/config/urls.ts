//const BASE_URL = "http://192.168.1.100/Madrasati/public/api";
const BASE_URL = "http://YOUR_BACKEND_SERVER_IP_ADDRESS/Madrasati/public/api";

const UrlResolver = {

    role: "student", // Choose ONE of the following: ['admin', 'teacher', 'parent', 'student']

    login: BASE_URL + "/login",
    register: BASE_URL + "/register",
    forgotPassword: BASE_URL + "/forgot-password",
}


export default UrlResolver;