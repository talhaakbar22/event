import axios from "axios";
const instance = axios.create({
    baseURL: "http://emailsend.mirindaweb.com", 
    timeout: 1000,
    headers: {}
});
export { instance }
