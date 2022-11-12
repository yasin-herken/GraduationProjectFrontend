import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = (TOKEN)=>axios.create({
    baseURL: BASE_URL,
    headers: { authorization: TOKEN }
})