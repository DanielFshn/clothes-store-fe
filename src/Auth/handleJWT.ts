import { claim } from "./auth.models";

const tokenKey = "token";
const expirationKey = "token-expiration";
export function saveToken(tokeData: string) {
  localStorage.setItem(tokenKey, tokeData);
  const decodedJwt = parseJwt(tokeData);
  localStorage.setItem(expirationKey, decodedJwt.exp);
}

export function getClaims(): claim[] {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return [];
  }
  const expiration = localStorage.getItem(expirationKey);
  if (expiration) {
    const expirationDate = new Date(expiration);
    if (expirationDate <= new Date()) {
        logout();
      return [];
    }
  }
  const dataToken = parseJwt(token);
  const response: claim[] = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] });
  }
  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
