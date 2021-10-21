import axios from "axios";
const instance = axios.create({
    baseURL: "http://emailsend.mirindaweb.com",
    headers: {}
});
export { instance }
