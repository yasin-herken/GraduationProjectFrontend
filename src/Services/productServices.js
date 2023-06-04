import { userRequest } from "../Requests/RequestMethods";
import { getToken } from "./tokenServices";
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

export const getProduct = async (id) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(
    `/api/seller/products/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
};

export const getProductForOrder = async (id) => {
  const response = await userRequest(`Bearer ${getToken()}`).get(
    `/api/order/products/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export const postProduct = async (data) => {
  const response = await userRequest(`Bearer ${getToken()}`).post(
    `/api/seller`,
    data
  );

  if (response.status === 201 || response.status === 200) {
    return response.data;
  } else if (response.status === 400) {
    throw new Error(response.data.message);
  } else {
    throw new Error("Something went wrong");
  }
};

export const putProduct = async (id, data) => {
  const response = await userRequest(`Bearer ${getToken()}`).put(
    `/api/seller/products/${id}`,
    data
  );

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 400) {
    throw new Error(response.data.message);
  } else {
    throw new Error("Something went wrong");
  }
}

