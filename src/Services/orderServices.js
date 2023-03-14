import {userRequest} from "../Requests/RequestMethods";
import {getToken} from "./tokenServices";

export const getOrdersBy = async ({pageSize, sortBy, direction, page}) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(`/api/seller/orders`, {
    params: {
      pageSize, sortBy, direction, page,
    },
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
};

export const updateOrderStatus = async (id, status) => {
  console.log(id, status)
  const response = await userRequest(`Bearer ${getToken()}`).put(`/api/order/${id}`, status,
    {headers: {"Content-Type": "text/plain"}}
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
}