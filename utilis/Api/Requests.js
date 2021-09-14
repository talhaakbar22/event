import { instance } from "./instance";
const post_request = async ({ target, body }) => {
    console.log("Adadadaaaaaaaaaaaaaaaaaaaaaaaaaaa", body);
    try {
        const response = await instance.post(target, body)
        console.log("post response", response.data);
        return response

    } catch (error) {
        console.log("post error", error);
        // alert("check your internet connection...");
        return "Error"
    }

}

const get_request = async (target) => {
    try {
        const response = await instance.get(target)
        var res = response.data
        return res

    } catch (error) {
        console.log("get error", error);
        // alert("check your internet connection...");
        return "Error"
    }
}

export { post_request, get_request }
