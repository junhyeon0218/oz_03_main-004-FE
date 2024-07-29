export const getItem = (item) => {
    return sessionStorage.getItem(item);
};

export const setItem = (item, value) => {
    return sessionStorage.setItem(item, value);
};

export const removeItem = (item) => {
    return sessionStorage.removeItem(item);
};
