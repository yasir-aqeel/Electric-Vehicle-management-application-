import cryptoJs from "crypto-js";

const TOKEN_KEY = "token";
const DEMO_MODE_KEY = "demoMode";

const getSecureKey = () => import.meta.env.VITE_SECURE_KEY;

export const getStoredToken = () => {
  const encryptedToken = sessionStorage.getItem(TOKEN_KEY);
  const secureKey = getSecureKey();

  if (!encryptedToken || !secureKey) {
    return "";
  }

  try {
    const bytes = cryptoJs.AES.decrypt(encryptedToken, secureKey);
    return bytes.toString(cryptoJs.enc.Utf8);
  } catch (error) {
    sessionStorage.removeItem(TOKEN_KEY);
    return "";
  }
};

export const setStoredToken = (token) => {
  const secureKey = getSecureKey();

  if (!token || !secureKey) {
    sessionStorage.removeItem(TOKEN_KEY);
    return;
  }

  const encryptedToken = cryptoJs.AES.encrypt(token, secureKey).toString();
  sessionStorage.setItem(TOKEN_KEY, encryptedToken);
};

export const clearStoredToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(DEMO_MODE_KEY);
};

export const enableDemoMode = () => {
  sessionStorage.setItem(DEMO_MODE_KEY, "true");
};

export const isDemoMode = () => sessionStorage.getItem(DEMO_MODE_KEY) === "true";
