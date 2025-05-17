export const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;
export const truncate = (str, len = 100) => str.length > len ? str.substring(0, len) + '...' : str;
