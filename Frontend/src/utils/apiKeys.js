// src/utils/apiKeys.js

const API_KEYS = [
    'AIzaSyB-nXYquO16hkPOWamAseMtltZqV7LlOyk',  
    'AIzaSyBM6M5BsT0_PyIva2eP4sllzw-sNkEFG8I', 
    'AIzaSyA6Z_qO6KdSBXwOXPG11emOib-PjhmDMwc', 
];

let currentKeyIndex = 0;

export const getNextApiKey = () => {
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
};

export const resetApiKeyIndex = () => {
    currentKeyIndex = 0;
};