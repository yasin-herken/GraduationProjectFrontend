import { userRequest } from "../Requests/RequestMethods";
import { getToken } from "./tokenServices";

export const getUsers = async ({ pageSize, sortBy, direction, page }) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(
    `/api/admin/users`,
    {
      params: {
        pageSize,
        sortBy,
        direction,
        page,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
};

export const getProducts = async ({ pageSize, sortBy, direction, page }) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(
    `/api/seller/products`,
    {
      params: {
        pageSize,
        sortBy,
        direction,
        page,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
};

export const deleteProduct = async (id) => {
  const response = await userRequest(`Bearer ${getToken()}`).delete(
    `/api/seller/products/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
}
