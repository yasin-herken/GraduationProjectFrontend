import { userRequest } from "../Requests/RequestMethods";
import { getToken } from "./tokenServices";

export const getUsers = async ({pageNo,pageSize,sortBy,direction,page}) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(`/api/admin/users`,{
    params: {
      pageNo,
      pageSize,
      sortBy,
      direction,
      page
    },
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
};
