import store from "../Store/store.js";

export const getToken = () => {
    return store.getState()?.user?.token;
};
