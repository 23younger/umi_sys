import { apis } from "./apis";
import { request } from "@umijs/max";

console.log(request.config);


export async function getList(params: any) {
    return request(apis.USERLIST, {
        method: 'POST',
        params
    })
}

export async function getUserInfo(params:any) {
    return request(apis.USERINFO, {
        method: 'GET',
        params
    })
}