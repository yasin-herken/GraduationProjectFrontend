import { userRequest } from "../../../Requests/RequestMethods";
import { getToken } from "../../../Services/tokenServices";
export const getCategories = async () => {
    const response = await userRequest(`Bearer ${getToken()}`).get(
        `/api/categories`
    );
    
    if (response.status === 200) {
        return response.data;
    }
    return null;
};
